import { useEffect, useRef, useMemo, useId, type Ref } from "react";
import {
  type GeoProjection,
  type GeoPath,
  type GeoPermissibleObjects,
  type Selection,
  select,
  geoOrthographic,
  geoPath,
  geoGraticule,
} from "d3";
import { feature, mesh } from "topojson-client";
import { useGetTopology } from "../api";
import type { GlobeOptions } from "./types";

type CountryProperties = { name: string };
type CountryFeature = GeoJSON.Feature<GeoJSON.Geometry, CountryProperties>;

type UseGlobeReturn = Ref<SVGSVGElement>;

export function useGlobe({
  angle = [0, 0],
  colors = {},
  mode = "2d",
  highlights = [],
}: GlobeOptions): UseGlobeReturn {
  const svgRef = useRef<SVGSVGElement>(null);
  const projectionRef = useRef<GeoProjection | null>(null);
  const pathRef = useRef<GeoPath | null>(null);
  const countriesRef =
    useRef<Selection<SVGPathElement, CountryFeature, SVGGElement, unknown>>(
      null,
    );
  const highlightBordersRef =
    useRef<Selection<SVGPathElement, CountryFeature, SVGGElement, unknown>>(
      null,
    );

  // refs всегда хранят актуальные пропсы, чтобы ResizeObserver
  // не использовал устаревшие значения из замыкания
  const angleRef = useRef(angle);
  const colorsRef = useRef(colors);
  const highlightsRef = useRef(highlights);
  angleRef.current = angle;
  colorsRef.current = colors;
  highlightsRef.current = highlights;

  const { data: world } = useGetTopology();
  const shadowId = useId();
  const lightId = useId();

  const geometry = useMemo(() => {
    if (!world) return null;
    const countries = feature(
      world,
      world.objects.countries,
    ) as unknown as GeoJSON.FeatureCollection<
      GeoJSON.Geometry,
      CountryProperties
    >;
    const borders = mesh(world, world.objects.countries, (a, b) => a !== b);
    return { countries, borders };
  }, [world]);

  // Построение структуры: пересобирается на смену world, mode, и при resize
  useEffect(() => {
    const node = svgRef.current;
    if (!geometry || !node) return;
    if (typeof ResizeObserver === "undefined") return;

    function draw(diameter: number) {
      if (!node || !geometry) return;
      const radius = diameter / 2;
      const root = select(node).select<SVGGElement>("g[data-globe-root]");
      root.selectAll("*").remove();

      const currentAngle = angleRef.current;
      const currentColors = colorsRef.current;
      const currentHighlights = highlightsRef.current;

      const projection = geoOrthographic()
        .scale(radius)
        .rotate(currentAngle)
        .translate([radius, radius]);
      projectionRef.current = projection;

      const path = geoPath().projection(projection);
      pathRef.current = path;

      const graticule = geoGraticule();
      const defs = root.append("defs");

      if (mode === "3d") {
        const filter = defs.append("filter").attr("id", shadowId);
        filter.append("feGaussianBlur").attr("stdDeviation", radius * 0.08);
        root
          .append("circle")
          .attr("cx", radius)
          .attr("cy", radius)
          .attr("r", radius * 0.9)
          .attr("fill", "var(--color-neutral-500)")
          .attr("filter", `url(#${shadowId})`);
      }

      root
        .append("circle")
        .attr("cx", radius)
        .attr("cy", radius)
        .attr("r", radius)
        .attr("fill", currentColors.sphere ?? "#D9E3D7");

      const g = root.append("g");

      g.append("path")
        .datum(graticule())
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", currentColors.graticule ?? "#A3C293")
        .attr("stroke-width", 0.5);

      const highlightSet = new Set(currentHighlights);

      const countries = g
        .selectAll<SVGPathElement, CountryFeature>(".country")
        .data(geometry.countries.features)
        .join("path")
        .attr("class", "country")
        .attr("d", path)
        .attr("fill", (d) =>
          highlightSet.has(d.properties.name)
            ? (currentColors.highlightCountry ?? "var(--color-accent-400)")
            : (currentColors.country ?? "var(--color-accent-600)"),
        );
      countriesRef.current = countries;

      g.append("path")
        .datum(geometry.borders)
        .attr("fill", "none")
        .attr("stroke", currentColors.borders ?? "rgba(255,255,255,0.4)")
        .attr("stroke-width", 0.4)
        .attr("d", path);

      const highlightBorders = g
        .selectAll<SVGPathElement, CountryFeature>(".country-highlight-border")
        .data(
          geometry.countries.features.filter((d) =>
            highlightSet.has(d.properties.name),
          ),
        )
        .join("path")
        .attr("class", "country-highlight-border")
        .attr("fill", "none")
        .attr(
          "stroke",
          currentColors.highlightBorder ?? "var(--color-accent-50)",
        )
        .attr("stroke-width", 1)
        .attr("d", path);
      highlightBordersRef.current = highlightBorders;

      if (mode === "3d") {
        const gradient = defs
          .append("radialGradient")
          .attr("id", lightId)
          .attr("cx", "10%")
          .attr("cy", "10%")
          .attr("r", "100%");
        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "var(--color-neutral-50)")
          .attr("stop-opacity", 0.4);
        gradient
          .append("stop")
          .attr("offset", "50%")
          .attr("stop-color", "transparent");
        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "var(--color-neutral-950)")
          .attr("stop-opacity", 0.6);
        root
          .append("circle")
          .attr("cx", radius)
          .attr("cy", radius)
          .attr("r", radius)
          .attr("fill", `url(#${lightId})`);
      }
    }

    const observer = new ResizeObserver(([entry]) => {
      const diameter = entry.contentRect.width;
      if (diameter > 0) draw(diameter);
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, [geometry, mode, shadowId, lightId]);

  // Вращение: легкий апдейт без пересборки DOM
  useEffect(() => {
    const projection = projectionRef.current;
    const path = pathRef.current;
    const node = svgRef.current;
    if (!projection || !path || !node) return;

    projection.rotate(angle);
    select(node)
      .selectAll<SVGPathElement, GeoPermissibleObjects>("path")
      .attr("d", path);
  }, [angle]);

  useEffect(() => {
    const countries = countriesRef.current;
    const path = pathRef.current;
    if (!countries || !path || !geometry) return;

    const highlightSet = new Set(highlights);

    countries.attr("fill", (d) =>
      highlightSet.has(d.properties.name)
        ? (colors.highlightCountry ?? "var(--color-accent-400)")
        : (colors.country ?? "var(--color-accent-600)"),
    );

    const parent = (countries.node()?.parentNode ?? null) as SVGGElement | null;
    if (!parent) return;

    const highlightBorders = select(parent)
      .selectAll<SVGPathElement, CountryFeature>(".country-highlight-border")
      .data(
        geometry.countries.features.filter((d) =>
          highlightSet.has(d.properties.name),
        ),
      )
      .join("path")
      .attr("class", "country-highlight-border")
      .attr("fill", "none")
      .attr("stroke", colors.highlightBorder ?? "var(--color-accent-50)")
      .attr("stroke-width", 1)
      .attr("d", path);
    highlightBordersRef.current = highlightBorders;
  }, [
    highlights,
    colors.highlightCountry,
    colors.country,
    colors.highlightBorder,
    geometry,
  ]);

  return svgRef;
}

import { useMemo } from 'react';
import { appleStock } from '@visx/mock-data';
//import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import useMeasure from 'react-use-measure';
import { extent, bisector } from 'd3-array';
//import { timeFormat } from 'd3-time-format';
import { Group } from '@visx/group';
import { curveNatural } from '@visx/curve';
import { Bar, Line, LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
//import { localPoint } from '@visx/event';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Grid } from '@visx/grid';

import styles from './line.module.css';

import {
	margin,
	getInnerDimensions,
	getXValue,
	getYValue,
} from '../config/variables';

const data = appleStock;

function LineChart() {
	// const {
	// 	showTooltip,
	// 	hideTooltip,
	// 	tooltipData,
	// 	tooltipLeft = 0,
	// 	tooltipTop = 0,
	// } = useTooltip();

	const [ref, { width, height }] = useMeasure();
	const { innerHeight, innerWidth } = getInnerDimensions(height, width);

	const xScale = useMemo(
		() =>
			scaleTime({
				domain: extent(data, getXValue),
				range: [margin.left, width - margin.right],
			}),
		[width]
	);

	// const xScale = useMemo(
	// 	() =>
	// 		scaleLinear({
	// 			domain: [
	// 				Math.min(...data.map(getXValue)),
	// 				Math.max(...data.map(getXValue)),
	// 			],
	// 			range: [margin.left, width - margin.right],
	// 			nice: true,
	// 		}),
	// 	[width]
	// );
	const yScale = useMemo(
		() =>
			scaleLinear({
				domain: [
					Math.min(...data.map(getYValue)),
					Math.max(...data.map(getYValue)),
				],
				range: [height - margin.bottom, margin.top],
				nice: true,
			}),
		[height]
	);

	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<svg
					ref={ref}
					width="100%"
					height="100%"
					viewBox={`0 0 ${width} ${height}`}
				>
					<Group>
						<Grid
							//top={margin.top}
							//left={margin.left}
							xScale={xScale}
							yScale={yScale}
							width={width}
							height={height}
							stroke="black"
							strokeOpacity={0.1}
							//	xOffset={margin.left}
						/>
						<LinePath
							data={data}
							x={(d) => xScale(getXValue(d)) ?? 0}
							y={(d) => yScale(getYValue(d)) ?? 0}
							stroke="#23DBBD"
							strokeWidth={2}
							curve={curveNatural}
						/>
					</Group>
					<Group>
						<AxisBottom
							top={height - margin.bottom}
							scale={xScale}
							//	tickFormat={(data) => data.date}
						/>
					</Group>

					<Group>
						<AxisLeft left={margin.left} scale={yScale} />
					</Group>
					{/* <Group>
						<Bar
							width={width}
							height={height}
							fill="transparent"
							onMouseMove={(event) => {
								const { x } = localPoint(event) || { x: 0 };
								const x0 = xScale.invert(x);
								const index = bisect(data, x0, 1);
								const d0 = data[index - 1];
								const d1 = data[index];
								let d = data[d0];
								if (d1 && getXValue(d1)) {
									d =
										x0.valueOf() - getXValue(d0).valueOf() >
										getXValue(d1).valueOf() - x0.valueOf()
											? d1
											: d0;
								}
								showTooltip({
									tooltipData: d,
									tooltipLeft: x,
									tooltipTop: yScale(getYValue(d)),
								});
							}}
							onMouseLeave={() => hideTooltip()}
						/>
					</Group>

					{tooltipData ? (
						<Group>
							<Line
								from={{ x: tooltipLeft, y: 0 }}
								to={{ x: tooltipLeft, y: height }}
								stroke="#59588D"
								strokeWidth={1}
								pointerEvents="none"
								strokeDasharray="5, 5"
							/>
							<circle
								cx={tooltipLeft}
								cy={tooltipTop}
								r={8}
								fill="#FF4DCA"
								fillOpacity={0.5}
								pointerEvents="none"
							/>
							<circle
								cx={tooltipLeft}
								cy={tooltipTop}
								r={4}
								fill="#FF4DCA"
								pointerEvents="none"
							/>
						</Group>
					) : null*/}
				</svg>
				{/*
				{tooltipData ? (
					<TooltipWithBounds
						key={Math.random()}
						top={tooltipTop}
						left={tooltipLeft}
						//style={tooltipStyles}
					>
						<b>{formatter.format(getYValue(tooltipData))}</b>
					</TooltipWithBounds>
				) : null} */}
			</div>
		</div>
	);
}

export default LineChart;

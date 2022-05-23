export function setTooltipStyles(defaultStyles) {
	return {
		...defaultStyles,
		minWidth: 60,
		backgroundColor: 'rgba(0,0,0,0.9)',
		color: 'white',
		borderRadius: 3,
	};
}
export const margin = { top: 32, right: 32, bottom: 32, left: 32 };

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export function getInnerDimensions(height, width) {
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	return { innerHeight, innerWidth };
}

export const getXValue = (d) => new Date(d.date);
export const getYValue = (d) => d.close;

import { getIconColor, TIconProps } from './utils';

export const DeleteIcon = ({ type, onClick }: TIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={getIconColor(type)}
            onClick={onClick}
        >
            <path
                d="M18.9391 8.69713C19.1384 8.69713 19.3193 8.78413 19.4623 8.93113C19.5955 9.08813 19.6626 9.28313 19.6432 9.48913C19.6432 9.55712 19.1102 16.2971 18.8058 19.134C18.6152 20.875 17.4929 21.932 15.8094 21.961C14.5149 21.99 13.2496 22 12.0038 22C10.6811 22 9.38763 21.99 8.13206 21.961C6.50498 21.922 5.38168 20.846 5.20079 19.134C4.88763 16.2871 4.36439 9.55712 4.35467 9.48913C4.34494 9.28313 4.41108 9.08813 4.54529 8.93113C4.67756 8.78413 4.86818 8.69713 5.06852 8.69713H18.9391ZM14.0647 2C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647Z"
                fill={getIconColor(type)}
            />
        </svg>
    );
};

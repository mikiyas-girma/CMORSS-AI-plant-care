interface SvgLogoProps {
    width: number;
    height: number;
    className?: string;
}

const SvgLogo = ({width, height, className}: SvgLogoProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 320 321" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="-0.00012207" y="0.604553" width="319.523" height="319.523" rx="58.9411" fill="#20A144"/>
            <path d="M260.431 145.759C256.397 132.448 244.699 113.892 212.429 101.385C180.561 89.2837 88.1843 69.114 78.5032 74.3581C77.697 74.762 76.8893 75.5681 76.0831 75.972C75.2769 76.7782 74.4693 77.9882 73.6631 79.1982C72.0492 83.232 73.2592 86.0561 74.8731 89.686C78.907 98.5601 91.8149 125.991 100.69 210.299C103.514 239.746 118.842 252.655 130.944 257.897C138.608 261.527 146.676 262.737 154.744 262.737C168.862 262.737 182.173 258.3 191.453 251.846C201.941 244.584 207.992 232.08 209.203 216.348C204.362 211.104 199.521 207.07 196.295 204.247C195.891 203.843 195.488 203.44 194.681 203.037L194.277 202.633C191.857 199.809 189.033 196.985 186.209 193.759H185.805L156.762 197.389H155.956C151.922 197.389 148.694 194.565 148.292 190.531C147.888 186.093 150.712 182.059 155.15 181.657L173.301 179.237C156.762 162.295 138.61 145.352 130.945 142.528C126.911 140.914 124.895 136.478 126.507 132.04C128.121 128.006 132.557 125.99 136.995 127.602C143.853 130.426 153.937 138.494 164.829 148.578L166.845 131.232C167.249 126.794 171.283 123.97 175.719 124.374C180.157 124.778 182.981 128.812 182.577 133.248L178.947 162.292C191.855 175.199 203.15 187.705 206.78 191.335C208.796 192.949 216.058 199.403 224.126 207.874C236.632 205.858 246.715 199.807 253.169 190.933C262.045 178.026 264.869 161.084 260.431 145.755L260.431 145.759Z" fill="white"/>
        </svg>
    )
}

export default SvgLogo;
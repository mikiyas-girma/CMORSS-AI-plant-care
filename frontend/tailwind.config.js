/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        'primary-green': '#20a144',
        'primary-orange': '#f38d5a',
        'secondary-blue': '#2082A1',
        white: '#FFFFFF',
        'green-neutral': '#E4F3E8',
        'gray-full': '#595959',
        'gray-neutral': '#F0F0F0',
        'danger-red': '#fe0101',

        // ShadCN
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        rotateLogo: {
          '0%': {
            transform: 'perspective(3000px) rotateY(0)',
          },
          '25%': {
            transform: 'perspective(3000px) rotateY(90deg)',
          },
          '50%': {
            transform: 'perspective(3000px) rotateY(180deg)',
          },
          '75%': {
            transform: 'perspective(3000px) rotateY(270deg)',
          },
          '100%': {
            transform: 'perspective(3000px) rotateY(360deg)',
          },
        },
      },
      animation: {
        rotateLogo: 'rotate 1s normal linear infinite 4s',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

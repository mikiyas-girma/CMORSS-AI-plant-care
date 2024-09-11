import {
  MoonCloudMidRain,
  MoonCloudWind,
  SunCloudMidRain,
  SunCloudRain,
  TornadoWind,
  Chat3D,
  Community3D,
  Journal3D,
  Plant3D,
} from '@/assets';

/**
 * Sign in Route Component
 * @returns JSX Component for the page.
 */
const SignIn = () => {
  return (
    <div>
      SignIn:
      <div>
        <img src={MoonCloudMidRain} alt="MoonCloud" />
        <img src={MoonCloudWind} alt="MoonCloud" />
        <img src={SunCloudMidRain} alt="MoonCloud" />
        <img src={SunCloudRain} alt="MoonCloud" />
        <img src={TornadoWind} alt="MoonCloud" />
        <img src={Chat3D} alt="MoonCloud" />
        <img src={Community3D} alt="MoonCloud" />
        <img src={Journal3D} alt="MoonCloud" />
        <img src={Plant3D} alt="MoonCloud" />
      </div>
    </div>
  );
};

export default SignIn;

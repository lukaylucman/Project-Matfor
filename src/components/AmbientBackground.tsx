import LightRays from './LightRays';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0a0a0a]">
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#6A0DAD"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.5 }}>
           <LightRays
            raysOrigin="bottom-center"
            raysColor="#FF5FA2"
            raysSpeed={1.0}
            lightSpread={1.2}
            rayLength={1.0}
            pulsating={true}
            followMouse={false}
            noiseAmount={0.2}
            distortion={0.1}
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-dark/30 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}


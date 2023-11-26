import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import { motion } from "framer-motion";

function Confetti() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  return (
    <motion.div initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          preset: "confetti",
          fpsLimit: 60,
          detectRetina: true,
          emitters: {
            life: {
              duration: 4,
              count: 3
            },
            startCount: 100,
            size: {
              width: 100,
              height: 10
            },
            position: {
              x: 50,
              y: 10
            }
          }
        }}
      />
    </motion.div>
  );
}

export default Confetti;

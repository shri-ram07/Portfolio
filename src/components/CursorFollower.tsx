import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/use-mouse-position';

const CursorFollower = () => {
  const { x, y } = useMousePosition();

  const variants = {
    default: {
      x: x - 16,
      y: y - 16,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(4px)',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 28,
      },
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 neon-border"
      variants={variants}
      animate="default"
    />
  );
};

export default CursorFollower;

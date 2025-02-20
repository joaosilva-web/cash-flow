import { Text } from "@chakra-ui/react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const MotionValue = motion(Text);
const MotionSpan = motion.span;

interface IMoneyCountProps {
  valueToCount: number;
  color?: string;
}

export function MoneyCounter({
  valueToCount,
  color = "title",
}: IMoneyCountProps) {
  const count = useMotionValue(0);

  const formattedValue = useTransform(count, (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
    }).format(value)
  );


  useEffect(() => {
    const controls = animate(count, valueToCount, {
      duration: 2,
      ease: [0.25, 1, 0.5, 1],
    });
    return () => controls.stop();
  }, [valueToCount]);

  return (
    <MotionValue
      fontSize="2.25rem"
      color={color}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      R${" "}
      <MotionSpan
        transition={{
          duration: 2,
          repeatType: "reverse",
        }}
        initial={{ scale: 0.8, rotate: 0 }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, -2, 2, 0] }}
      >
        {formattedValue}
      </MotionSpan>
    </MotionValue>
  );
}

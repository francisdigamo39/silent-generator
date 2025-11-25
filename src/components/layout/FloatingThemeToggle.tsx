import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

type FloatingThemeToggleProps = {
  theme: string;
  onToggle: () => void;
};

export function FloatingThemeToggle({ theme, onToggle }: FloatingThemeToggleProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={onToggle}
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg backdrop-blur-md bg-card/80 hover:bg-card border border-border hover:scale-110 transition-all duration-200"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon
                icon={theme === "dark" ? "lucide:moon" : "lucide:sun"}
                className="h-5 w-5"
              />
            </motion.div>
          </Button>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Toggle {theme === "dark" ? "Light" : "Dark"} Mode</p>
      </TooltipContent>
    </Tooltip>
  );
}

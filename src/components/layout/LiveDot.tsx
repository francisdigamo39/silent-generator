type LiveDotProps = {
  live: boolean;
};

export function LiveDot({ live }: LiveDotProps) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span
        className={`inline-flex h-2.5 w-2.5 rounded-full ${
          live ? "bg-accent" : "bg-muted"
        } animate-pulse`}
      />
      <span className="text-muted-foreground">{live ? "Live" : "Paused"}</span>
    </div>
  );
}

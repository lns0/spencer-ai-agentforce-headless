export default function AppFooter() {
  return (
    <footer className="w-full flex justify-center items-center py-6 mt-8 gap-6">
      <a
        href="https://www.linkedin.com/in/spencersaldana/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-orbitron text-white/70 hover:text-neoncyan transition-colors duration-200 text-lg px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-neoncyan neon-border"
        style={{textShadow: '0 0 8px #00fff7'}}
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/lns0"
        target="_blank"
        rel="noopener noreferrer"
        className="font-orbitron text-white/70 hover:text-neoncyan transition-colors duration-200 text-lg px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-neoncyan neon-border"
        style={{textShadow: '0 0 8px #00fff7'}}
      >
        GitHub
      </a>
      <a
        href="https://www.spencersaldana.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-orbitron text-white/70 hover:text-neoncyan transition-colors duration-200 text-lg px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-neoncyan neon-border"
        style={{textShadow: '0 0 8px #00fff7'}}
      >
        About Spencer
      </a>
    </footer>
  );
}

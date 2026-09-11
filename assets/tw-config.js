/* Configuration Tailwind partagée par les trois pages.
   Chargée juste après le CDN, qui doit être présent pour que
   l'objet tailwind existe.
   Les mêmes valeurs sont reprises en variables CSS dans
   assets/style.css : toute modification doit se faire aux deux
   endroits. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        bg: '#14141f',
        bgAlt: '#1a1a28',
        line: '#2c2c42',
        ink: '#f2f2f7',
        mut: '#a0a0bd',
        dim: '#8585a6',
        accent: '#e05252',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
}

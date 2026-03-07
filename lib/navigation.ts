export function navigateToSection(id: string) {
  window.dispatchEvent(new CustomEvent('open-section', { detail: id }));
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

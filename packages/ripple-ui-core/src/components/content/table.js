// Add scroll overflow indicators
document.addEventListener('DOMContentLoaded', () => {
  const tables = document.querySelectorAll('.rpl-table__scroll-container')

  if (tables.length) {
    window.addEventListener('resize', toggleScrollIndicator, { passive: true })

    toggleScrollIndicator()
  }

  function toggleScrollIndicator() {
    tables.forEach(table => {
        table.parentElement.classList.toggle('rpl-table--scrollable', table.scrollWidth > table.clientWidth)
    })
  }
})

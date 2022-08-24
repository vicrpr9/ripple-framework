// Add scroll overflow indicators
document.addEventListener('DOMContentLoaded', () => {
  const tables = document.querySelectorAll('.rpl-table__scroll-container')

  tables.forEach(table => {
    const inner = table.querySelector('.rpl-table__scroll-container-inner')

    inner.addEventListener('scroll', () => setScrollIndicators(table, inner), { passive: true })

    setScrollIndicators(table, inner)
  })

  function setScrollIndicators(table, inner) {
    if (inner.scrollLeft) {
      table.classList.add('rpl-table--scroll-left')
    } else {
      table.classList.remove('rpl-table--scroll-left')
    }

    if (inner.scrollLeft === inner.scrollLeftMax) {
      table.classList.remove('rpl-table--scroll-right')
    } else {
      table.classList.add('rpl-table--scroll-right')
    }
  }
})

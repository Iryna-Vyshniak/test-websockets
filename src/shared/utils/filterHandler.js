const filterHandler = (event, cards, changeHandler) => {
  const filterCards = cards.filter(card => {
    const cardNameLowerCase = card.name.toLowerCase();
    const queryLowerCase = event.target.value.toLowerCase();
    return cardNameLowerCase.includes(queryLowerCase);
  });

  changeHandler({ name: 'filterCards', value: filterCards });
  changeHandler({ name: 'filterValue', value: event.target.value });
};

export { filterHandler };

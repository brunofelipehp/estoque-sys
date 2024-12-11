export const stylesFormSelectProduct = {
  control: (base: any, state: any) => ({
    ...base,
    border: state.isFocused
      ? '2px solid #6d28d9'
      : '1px solid #ccc',
    boxShadow: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      borderColor: '#6d28d9',
    },
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused
      ? '#6d28d9'
      : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#6d28d9',
      color: 'white',
    },
  }),
};
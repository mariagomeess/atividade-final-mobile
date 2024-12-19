// Ação para adicionar dados ao estado (por exemplo, produtos)
export const addData = (data) => ({
    type: 'ADD_DATA', // O tipo de ação que está sendo executada
    payload: data,    // Os dados que você quer adicionar ao estado
  });
  
  // Ação para definir o estado de loading (carregando ou não)
  export const setLoading = (loading) => ({
    type: 'SET_LOADING', // Tipo da ação
    payload: loading,    // O valor de loading (true/false)
  });
  
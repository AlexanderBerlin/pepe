import axios from "axios";

//получаем поле data из ответов сервера
const getDataFromResponse = ( response ) => response && response.data && response.data.data || void(0);

//получаем токены
const getTokensList = async function () {
    try {
        const data = await axios.get( '/get_token_list' );
        return getDataFromResponse( data ) || []
    } catch ( err ) {
        console.err( err )
    }
}

//получаем чайны
const getChainList = async function () {
    try {
        const data = await axios.get( '/get_chain_list' );
        return getDataFromResponse( data ) || []
    } catch ( err ) {
        console.err( err )
    }
}

//получам список провайдеров
const getProvidersList = async function () {
    try {
        const data = await axios.get( '/get_providers_list' );
        return getDataFromResponse( data ) || []
    } catch ( err ) {
        console.err( err )
    }
}


export { getTokensList, getChainList, getProvidersList }

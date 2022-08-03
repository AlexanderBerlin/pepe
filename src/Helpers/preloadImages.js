export const preLoadImage = src => new Promise( ( resolve, reject ) => {
    const img = new Image();

    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
} );

export default function ( imagesToPerLoadArray ) {
    return Promise.all( imagesToPerLoadArray.map( preLoadImage ) );
};
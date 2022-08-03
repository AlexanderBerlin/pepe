export function outsideClick( node ) {

    const handleClick = event => {
        if ( node && !node.contains( event.target ) && !event.defaultPrevented ) {
            node.dispatchEvent(
                new CustomEvent( 'click_outside', node )
            )
        }
    }

    document.addEventListener( 'click ', handleClick, true );
    // document.addEventListener( 'touchstart', handleClick, true );
    // document.addEventListener( 'mousedown', handleClick, true );

    return {
        destroy() {
            document.removeEventListener( 'click ', handleClick, true );
            // document.removeEventListener( 'touchstart', handleClick, true );
            // document.removeEventListener( 'mousedown', handleClick, true );
        }
    }
}
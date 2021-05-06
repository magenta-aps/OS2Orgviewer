export default function() {
    if (window.MSInputMethodContext && document.documentMode) {
        import('ie11-custom-properties')
    }
}
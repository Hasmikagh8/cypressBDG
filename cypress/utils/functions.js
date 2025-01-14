export function emailGenerator(len) {
    let mail = " ";
    let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    const gmail='@gmail.com'

    for (let i=0; i < len; i++ ) {
        mail += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return `${mail}${gmail}`;
}

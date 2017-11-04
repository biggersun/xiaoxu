export default function download(url) {
    const div = document.createElement('div');
    div.style.display = 'none';

    const a = document.createElement('a');
    a.setAttribute('download', '');
    a.href = url;

    div.appendChild(a);
    document.body.appendChild(div);

    if (a.click) {
        a.click();
    } else {
        const e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        a.dispatchEvent(e);
    }

    document.body.removeChild(div);
}

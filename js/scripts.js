// send message
function sendMessage() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const sekolah = document.getElementById("sekolah").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const jumlah = document.getElementById("jumlah").value;
    const textarea = document.getElementById("textarea").value;
    const url =
        "https://api.whatsapp.com/send?phone=6285737113905&text=Halo%20admin%20SepProjecta%0Asaya%20*" +
        name +
        "*%0Adari%20sekolah%20*" +
        sekolah +
        "*%0A*mau%20booking%20jasa%20Foto%20Graduation*%0Aditanggal%20*" +
        date +
        "*%0Ajam%20*" +
        startTime +
        "*%20sampai%20*" +
        endTime +
        "*%0Asaya%20booking%20untuk%20*" +
        jumlah +
        "*%20orang%0Adan%20pesan%20tambahan%20dari%20saya%3A%0A*" +
        textarea +
        "*";
    window.open(url);
}

// function emailSend(){
//   Email.send({
//     Host : "s1.maildns.net",
//     Username : "username",
//     Password : "password",
//     To : 'them@website.com',
//     From : "you@isp.com",
//     Subject : "This is the subject",
//     Body : "And this is the body"
// }).then(
//   message => alert(message)
// );
// }
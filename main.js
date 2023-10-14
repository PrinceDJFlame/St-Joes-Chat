function addRoom(){
    house_chat = document.getElementById("house_chat").value;

    firebase.database().ref("/").child(house_chat).update({
        purpose : "adding House Chat"
    });

    localStorage.setItem("house_chat", house_chat);

    window.location = "StJosChat.html";

    console.log("House Name - " + house_chat);
    row = "<div class='house_chat' id="+house_chat+" onclick='redirectToRoomName(this.id)' >#"+ house_chat +"</div><hr>";
    document.getElementById("output").innerHTML += row;
}

function addUser() {
    user_name = document.getElementById("user_name").value;

    localStorage.setItem("user_name", user_name);
    window.location = "StJosChat.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    console.log(firebase_mesage_id);
    console.log(message_data);
    name = message_data['name'];
    message = message_data['mesage'];
    like = message_data['like'];
    name_with_tag = "<h4>" + name +"<img class='user_tick' src='tick.png></h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button="<button class='btn btn-success' id=" + firebase_message_id+" value = " +like+"onclick = 'updateLike(this.id)'>";
    span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
    
    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
    
    });});}
getData();

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("house_chat", name);
    window.location = "StJosChat.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("house_chat");
    window.location = "index.html";
}

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          message:msg,
          like:0
    });

    document.getElementById("msg").value = "";
}

function updateLike(message_id){
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
          like : updated_likes
    });
}
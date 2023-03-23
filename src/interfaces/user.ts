export interface User {
  id:             string;
  first_name:     string;
  last_name:      string;
  birth_day:      number;  //??
  counrty:        string;
  language:       string; 
  email:          string;
  password:       string;
  profilePicture: string;
  role:           string;
  isLoggedin:     boolean;
  createdAt:      Date;
  updatedAt:      Date;
  username:       string;
}

export interface UserActivity {
  id:         string; //id user
  userId:     string; 
  playlistId: string[];  //id playlist
  likes:      string[];  //id tracks
  historyReproduction: string[]   // tuple //id tracks
}
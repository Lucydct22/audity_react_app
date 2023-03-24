export interface Playlist {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  publicAccessible: boolean;
  musicList: string[];
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface Track {  
  id: string;
  name: string;
  artist: string;
  url: string;
  thumbnail: string;
  genre: string[];
  likes: string[];//changed 
  album: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface Albums {
  id: string;
  name: string;
  genres: string[];
  tracks: [string]
  imageUrl: string;
  artist: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  photoUrl: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface Genres {
  id: string;
  name: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

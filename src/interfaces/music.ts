export interface Playlist {
  _id: string;
  name: string;
  thumbnail: string;
  description: string;
  publicAccessible: boolean;
  musicList: string[];
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface Track {  
  _id: string;
  name: string;
  artist: string;
  url: string;
  thumbnail: string;
  genre: string[];
  likes: string[];
  album: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface Albums {
  _id: string;
  name: string;
  genres: string[];
  tracks: [string]
  imageUrl: string;
  artist: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface Artist {
  _id: string;
  name: string;
  genres: string[];
  photoUrl: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface Genres {
  _id: string;
  name: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface Genre {
  _id: string;
  name: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

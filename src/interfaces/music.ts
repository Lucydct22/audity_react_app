export interface Playlist {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  publicAccessible: boolean;
  musicList: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  url: string;
  thumbnail: string;
  genre: string[];
  likes: string[];
  album: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Albums {
  id: string;
  name: string;
  genres: string[];
  imageUrl: string;
  artist: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Genres {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });

      toast.success("登录成功");

      return { data: res.data.data.user, auth: true };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ name, email, password, passwordConfirm }) => {
    try {
      const res = await axios.post("/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });

      toast.success("欢迎来到 Mawjat!");

      return { data: res.data.data.user, auth: true };
    } catch (e) {
      throw e;
    }
  },
);

export const isLoggedIn = createAsyncThunk(
  "user/isLoggedIn",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/users/isLoggedIn");

      toast.success("欢迎回来");

      return { data: res.data.data.user, auth: true };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const res = await axios.patch("/users/updateMe", data);

    toast.success("用户资料己更新");
    return res.data.data;
  } catch (err) {
    throw err;
  }
});

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (data) => {
    try {
      await axios.post("users/forgotPassword", data);

      toast.success("邮件己发送成功");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/users/resetPassword/${data.id}`, data);

      toast.success("密码己重置");

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data) => {
    try {
      await axios.patch("/users/updatePassword", data);

      toast.success("密码己更新");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    const res = await axios.get("users/logout");
    await toast.success(res.data.message);
  } catch (err) {
    console.log(err);
  }
});

// Like/dislike
export const likeSong = createAsyncThunk("song/likeSong", async (id) => {
  try {
    const res = await axios.post("/users/likes/add", {
      song: id,
    });

    toast.success("音乐己加入我喜欢的音乐");

    return res.data.songs;
  } catch (err) {
    throw err;
  }
});

export const dislikeSong = createAsyncThunk("song/dislikeSong", async (id) => {
  try {
    const res = await axios.post("/users/likes/remove", {
      song: id,
    });

    toast.success("音乐己移出我喜欢的音乐");

    return res.data.songs;
  } catch (err) {
    throw err;
  }
});

// Artist
export const followArtist = createAsyncThunk(
  "user/followArtist",
  async (id) => {
    try {
      const res = await axios.post(`/users/follow/${id}`);

      toast.success("己关注艺术家");

      return res.data.data;
    } catch (err) {
      throw err;
    }
  },
);

export const unfollowArtist = createAsyncThunk(
  "user/unfollowArtist",
  async (id) => {
    try {
      const res = await axios.post(`/users/unfollow/${id}`);

      toast.success("己取消关注艺术家");

      return res.data.data;
    } catch (err) {
      throw err;
    }
  },
);

export const becomeArtist = createAsyncThunk("user/becomeArtist", async () => {
  try {
    await axios.patch("/users/becomeArtist");

    toast.success("你己成为艺术家");
  } catch (err) {
    throw err;
  }
});

// Playlist
export const getAllPlaylists = createAsyncThunk(
  "user/getAllPlaylists",
  async () => {
    try {
      const res = await axios.get("/playlists");

      return res.data.data.playlists;
    } catch (err) {
      throw err;
    }
  },
);

// Playlist
export const getAllArtists = createAsyncThunk(
  "user/getAllArtists",
  async () => {
    try {
      const res = await axios.get("/users/allUsers");

      return res.data.data;
    } catch (err) {
      throw err;
    }
  },
);

// Playlist
export const createPlaylist = createAsyncThunk(
  "user/createPlaylist",
  async () => {
    try {
      const res = await axios.post("/playlists");

      toast.success("己创建播放列表");

      return res.data.data.user.playlists;
    } catch (err) {
      throw err;
    }
  },
);

export const deletePlaylist = createAsyncThunk(
  "user/deletePlaylist",
  async (id) => {
    try {
      const res = await axios.delete(`/playlists/${id}`);

      toast.success("己删除播放列表");
      return res.data.data.playlists;
    } catch (err) {
      throw err;
    }
  },
);

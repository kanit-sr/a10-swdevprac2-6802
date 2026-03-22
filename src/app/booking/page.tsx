"use client";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { addBooking } from "@/redux/features/bookSlice";
import type { AppDispatch } from "@/redux/store";

export default function BookingPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [nameLastname, setNameLastname] = useState("");
  const [tel, setTel] = useState("");
  const [venue, setVenue] = useState("");
  const [bookDate, setBookDate] = useState<Dayjs | null>(dayjs());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nameLastname || !tel || !venue || !bookDate) {
      return;
    }

    dispatch(
      addBooking({
        nameLastname,
        tel,
        venue,
        bookDate: bookDate.format("YYYY/MM/DD"),
      })
    );

    setNameLastname("");
    setTel("");
    setVenue("");
    setBookDate(dayjs());
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", gap: 2.5 }}
      >
        <Typography variant="h5" component="h1">
          Venue Booking
        </Typography>

        <TextField
          name="Name-Lastname"
          label="Name-Lastname"
          variant="standard"
          fullWidth
          value={nameLastname}
          onChange={(event) => setNameLastname(event.target.value)}
        />

        <TextField
          name="Contact-Number"
          label="Contact-Number"
          variant="standard"
          fullWidth
          value={tel}
          onChange={(event) => setTel(event.target.value)}
        />

        <FormControl variant="standard" fullWidth>
          <InputLabel id="venue-label">Venue</InputLabel>
          <Select
            id="venue"
            labelId="venue-label"
            value={venue}
            onChange={(event) => setVenue(event.target.value)}
          >
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Reserve Date"
            value={bookDate}
            onChange={(newValue) => setBookDate(newValue)}
          />
        </LocalizationProvider>

        <Button type="submit" name="Book Venue" variant="contained">
          Book Venue
        </Button>
      </Box>
    </Box>
  );
}

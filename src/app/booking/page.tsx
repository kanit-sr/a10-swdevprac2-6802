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
        p: { xs: 2, md: 4 },
        background:
          "radial-gradient(1000px 420px at 10% -10%, #f4d58d 0%, rgba(244, 213, 141, 0) 60%), radial-gradient(1000px 460px at 100% 0%, #c7d2fe 0%, rgba(199, 210, 254, 0) 58%), linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 560,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 24px 70px rgba(15, 23, 42, 0.35)",
          animation: "slideUp 420ms ease-out",
          "@keyframes slideUp": {
            from: { opacity: 0, transform: "translateY(14px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography
          variant="overline"
          sx={{
            letterSpacing: "0.2em",
            color: "rgba(251, 191, 36, 0.95)",
            fontWeight: 700,
          }}
        >
          Reserve Your Moment
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "#f8fafc",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          Venue Booking
        </Typography>
        <Typography
          sx={{
            color: "rgba(226, 232, 240, 0.86)",
            mb: 1,
            fontSize: "0.95rem",
          }}
        >
          Fill in your details and secure your preferred venue in one click.
        </Typography>

        <TextField
          name="Name-Lastname"
          label="Name-Lastname"
          variant="standard"
          fullWidth
          value={nameLastname}
          onChange={(event) => setNameLastname(event.target.value)}
          slotProps={{
            inputLabel: { sx: { color: "rgba(148, 163, 184, 0.95)" } },
            input: {
              sx: {
                color: "#e2e8f0",
                "&:before": { borderBottomColor: "rgba(148, 163, 184, 0.5)" },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "rgba(251, 191, 36, 0.8)",
                },
                "&:after": { borderBottomColor: "#fbbf24" },
              },
            },
          }}
        />

        <TextField
          name="Contact-Number"
          label="Contact-Number"
          variant="standard"
          fullWidth
          value={tel}
          onChange={(event) => setTel(event.target.value)}
          slotProps={{
            inputLabel: { sx: { color: "rgba(148, 163, 184, 0.95)" } },
            input: {
              sx: {
                color: "#e2e8f0",
                "&:before": { borderBottomColor: "rgba(148, 163, 184, 0.5)" },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "rgba(251, 191, 36, 0.8)",
                },
                "&:after": { borderBottomColor: "#fbbf24" },
              },
            },
          }}
        />

        <FormControl variant="standard" fullWidth>
          <InputLabel id="venue-label" sx={{ color: "rgba(148, 163, 184, 0.95)" }}>
            Venue
          </InputLabel>
          <Select
            id="venue"
            labelId="venue-label"
            value={venue}
            onChange={(event) => setVenue(event.target.value)}
            sx={{
              color: "#e2e8f0",
              "&:before": { borderBottomColor: "rgba(148, 163, 184, 0.5)" },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "rgba(251, 191, 36, 0.8)",
              },
              "&:after": { borderBottomColor: "#fbbf24" },
              ".MuiSvgIcon-root": { color: "#e2e8f0" },
            }}
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
            slotProps={{
              textField: {
                variant: "standard",
                sx: {
                  "& .MuiInputLabel-root": { color: "rgba(148, 163, 184, 0.95)" },
                  "& .MuiInputBase-root": {
                    color: "#e2e8f0",
                    "&:before": { borderBottomColor: "rgba(148, 163, 184, 0.5)" },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "rgba(251, 191, 36, 0.8)",
                    },
                    "&:after": { borderBottomColor: "#fbbf24" },
                  },
                },
              },
            }}
          />
        </LocalizationProvider>

        <Button
          type="submit"
          name="Book Venue"
          variant="contained"
          sx={{
            mt: 1,
            py: 1.2,
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
            background: "linear-gradient(90deg, #f59e0b, #f97316)",
            boxShadow: "0 10px 30px rgba(249, 115, 22, 0.35)",
            transition: "transform 180ms ease, box-shadow 180ms ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 14px 34px rgba(249, 115, 22, 0.4)",
              background: "linear-gradient(90deg, #f59e0b, #ea580c)",
            },
          }}
        >
          Book Venue
        </Button>
      </Box>
    </Box>
  );
}

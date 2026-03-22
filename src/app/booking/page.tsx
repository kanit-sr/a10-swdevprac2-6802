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
import DateReserve from "@/components/DateReserve";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function BookingPage() {
  const session = await getServerSession(authOptions);

  let userProfile = null;
  if (session?.user?.token) {
    const profileRes = await getUserProfile(session.user.token as string);
    userProfile = profileRes.data;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .booking-root {
          min-height: 100vh;
          background: #EDF2FB;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .profile-card {
          width: 100%;
          max-width: 520px;
          background: #0F2248;
          border-radius: 20px;
          padding: 28px 36px;
          margin-bottom: 24px;
          box-shadow: 0 8px 32px rgba(20,60,130,0.18);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .profile-heading {
          font-family: 'Playfair Display', serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(200,220,255,0.5);
          margin-bottom: 4px;
        }

        .profile-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 600;
          color: #EDF5FF;
        }

        .profile-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 24px;
          margin-top: 4px;
        }

        .profile-field label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(200,220,255,0.45);
          margin-bottom: 3px;
        }

        .profile-field span {
          font-size: 14px;
          color: #C8DCFF;
          font-weight: 400;
        }

        .booking-card {
          width: 100%;
          max-width: 520px;
          background: #F7FAFF;
          border-radius: 24px;
          padding: 40px 44px;
          box-shadow: 0 24px 60px rgba(20,60,130,0.13), 0 4px 16px rgba(20,60,130,0.07);
        }

        .booking-title {
          font-family: 'Playfair Display', serif !important;
          font-size: 2rem !important;
          font-weight: 600 !important;
          color: #0F2248 !important;
          margin-bottom: 32px !important;
          text-align: center;
        }

        .booking-card .MuiInput-underline:before { border-bottom-color: rgba(100,140,210,0.35); }
        .booking-card .MuiInput-underline:hover:not(.Mui-disabled):before { border-bottom-color: #2E5FA3; }
        .booking-card .MuiInput-underline:after { border-bottom-color: #1A3A6B; }
        .booking-card .MuiInputLabel-root {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #6B8FBF;
        }
        .booking-card .MuiInputLabel-root.Mui-focused { color: #1A3A6B; }
        .booking-card .MuiInputBase-input {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #0F2248;
          padding-bottom: 8px;
        }
        .booking-card .MuiSelect-icon { color: #6B8FBF; }

        .booking-fields { display: flex; flex-direction: column; gap: 24px; }

        .booking-btn {
          margin-top: 8px !important;
          background: #1A3A6B !important;
          color: #EDF5FF !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          border-radius: 999px !important;
          padding: 12px 0 !important;
          box-shadow: 0 4px 20px rgba(20,60,130,0.2) !important;
          transition: background 0.2s ease !important;
        }
        .booking-btn:hover { background: #2E5FA3 !important; }

        @media (max-width: 600px) {
          .booking-card { padding: 28px 20px; }
          .profile-card { padding: 22px 20px; }
          .profile-fields { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="booking-root">

        {userProfile && (
          <div className="profile-card">
            <p className="profile-heading">Logged in as</p>
            <p className="profile-name">{userProfile.name}</p>
            <div className="profile-fields">
              <div className="profile-field">
                <label>Email</label>
                <span>{userProfile.email}</span>
              </div>
              <div className="profile-field">
                <label>Tel.</label>
                <span>{userProfile.tel}</span>
              </div>
              <div className="profile-field">
                <label>Member Since</label>
                <span>{new Date(userProfile.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            </div>
          </div>
        )}

        <div className="booking-card">
          <Typography className="booking-title" component="h1">
            Venue Booking
          </Typography>

          <Box component="form" className="booking-fields">
            <TextField
              name="Name-Lastname"
              label="Name-Lastname"
              variant="standard"
              fullWidth
            />

            <TextField
              name="Contact-Number"
              label="Contact-Number"
              variant="standard"
              fullWidth
            />

            <FormControl variant="standard" fullWidth>
              <InputLabel id="venue-label">Venue</InputLabel>
              <Select id="venue" labelId="venue-label" defaultValue="">
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
              </Select>
            </FormControl>

            <DateReserve />

            <Button
              variant="contained"
              name="Book Venue"
              fullWidth
              className="booking-btn"
            >
              Book Venue
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
}
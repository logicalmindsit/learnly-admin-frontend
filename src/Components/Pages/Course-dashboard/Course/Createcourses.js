// //sx: { borderRadius: 2, backgroundColor: "white",width:"1100px" },

// import React, { useState, useEffect } from "react";
// import axios from "../../../../Utils/api";
// import {
//   Box,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Typography,
//   Paper,
//   Grid,
//   IconButton,
//   Chip,
// } from "@mui/material";
// import { AddCircle, RemoveCircle } from "@mui/icons-material";

// const CreateCourses = () => {
//   const [formData, setFormData] = useState({
//     coursename: "",
//     category: "",
//     courseduration: "6 months",
//     contentduration: { hours: 0, minutes: 0 },
//     price: {
//       amount: 0,
//       currency: "INR",
//       discount: 0,
//       finalPrice: 0,
//     },
//     level: "beginner",
//     language: "english",
//     certificates: "yes",
//     description: "",
//     whatYoullLearn: [],
//     thumbnail: null,
//     previewVideo: null,
//     instructor: {
//       name: "",
//       role: "",
//       socialmedia_id: "",
//     },
//   });

//   const [chapters, setChapters] = useState([
//     {
//       title: "",
//       lessons: [
//         {
//           lessonname: "",
//           audio: [],
//           video: [],
//           pdf: [],
//         },
//       ],
//     },
//   ]);

//   const [whatYoullLearnInput, setWhatYoullLearnInput] = useState("");

//   // Calculate final price whenever amount or discount changes
//   useEffect(() => {
//     const amount = parseFloat(formData.price.amount) || 0;
//     const discount = parseFloat(formData.price.discount) || 0;
//     const finalPrice = amount * (1 - discount / 100);

//     setFormData((prev) => ({
//       ...prev,
//       price: {
//         ...prev.price,
//         finalPrice: parseFloat(finalPrice.toFixed(2)),
//       },
//     }));
//   }, [formData.price.amount, formData.price.discount]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     } else if (name.startsWith("instructor.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         instructor: {
//           ...prev.instructor,
//           [key]: value,
//         },
//       }));
//     } else if (name.startsWith("contentduration.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         contentduration: {
//           ...prev.contentduration,
//           [key]: parseInt(value) || 0,
//         },
//       }));
//     } else if (name.startsWith("price.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         price: {
//           ...prev.price,
//           [key]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleWhatYoullLearn = () => {
//     if (whatYoullLearnInput.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         whatYoullLearn: [...prev.whatYoullLearn, whatYoullLearnInput.trim()],
//       }));
//       setWhatYoullLearnInput("");
//     }
//   };

//   const removeWhatYoullLearn = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       whatYoullLearn: prev.whatYoullLearn.filter((_, i) => i !== index),
//     }));
//   };

//   const handleChapterChange = (index, e) => {
//     const newChapters = [...chapters];
//     newChapters[index][e.target.name] = e.target.value;
//     setChapters(newChapters);
//   };

//   const handleLessonChange = (chapterIndex, lessonIndex, e) => {
//     const { name, value, files } = e.target;
//     const newChapters = [...chapters];
//     const lesson = newChapters[chapterIndex].lessons[lessonIndex];

//     if (files && files.length > 0) {
//       lesson[name] = Array.from(files);
//       // Also store names without extension
//       lesson[`${name}name`] = Array.from(files).map((f) =>
//         f.name.replace(/\.[^/.]+$/, "")
//       );
//     } else {
//       lesson[name] = value;
//     }

//     setChapters(newChapters);
//   };

//   const addChapter = () => {
//     setChapters([
//       ...chapters,
//       {
//         title: "",
//         lessons: [
//           {
//             lessonname: "",
//             audio: null,
//             video: null,
//             pdf: null,
//           },
//         ],
//       },
//     ]);
//   };

//   const removeChapter = (index) => {
//     if (chapters.length > 1) {
//       setChapters(chapters.filter((_, i) => i !== index));
//     }
//   };

//   const addLesson = (chapterIndex) => {
//     const newChapters = [...chapters];
//     newChapters[chapterIndex].lessons.push({
//       lessonname: "",
//       audio: null,
//       video: null,
//       pdf: null,
//     });
//     setChapters(newChapters);
//   };

//   const removeLesson = (chapterIndex, lessonIndex) => {
//     const newChapters = [...chapters];
//     if (newChapters[chapterIndex].lessons.length > 1) {
//       newChapters[chapterIndex].lessons = newChapters[
//         chapterIndex
//       ].lessons.filter((_, i) => i !== lessonIndex);
//       setChapters(newChapters);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const data = new FormData();

//     // Add top-level fields
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === "instructor") {
//         Object.entries(value).forEach(([subkey, subvalue]) => {
//           data.append(`instructor.${subkey}`, subvalue);
//         });
//       } else if (key === "contentduration") {
//         Object.entries(value).forEach(([subkey, subvalue]) => {
//           data.append(`contentduration.${subkey}`, subvalue);
//         });
//       } else if (key === "price") {
//         Object.entries(value).forEach(([subkey, subvalue]) => {
//           data.append(`price.${subkey}`, subvalue);
//         });
//       } else if (key === "whatYoullLearn") {
//         value.forEach((item, index) => {
//           data.append(`whatYoullLearn[${index}]`, item);
//         });
//       } else if (key === "thumbnail" || key === "previewVideo") {
//         if (value) {
//           data.append(key, value);
//           // Save raw name for thumbnail and previewVideo
//           const rawName = value.name.replace(/\.[^/.]+$/, "");
//           data.append(`${key}name`, rawName);
//         }
//       } else {
//         data.append(key, value);
//       }
//     });

//     // Add chapters and lessons
//     chapters.forEach((chapter, cIndex) => {
//       data.append(`chapters[${cIndex}].title`, chapter.title);

//       chapter.lessons.forEach((lesson, lIndex) => {
//         const base = `chapters[${cIndex}].lessons[${lIndex}]`;

//         data.append(`${base}.lessonname`, lesson.lessonname);

//         // Handle each file type with its name
//         ["audio", "video", "pdf"].forEach((fileType) => {
//           const files = lesson[fileType];
//           const names = lesson[`${fileType}name`] || [];

//           if (files && Array.isArray(files)) {
//             files.forEach((file, idx) => {
//               data.append(`${base}.${fileType}`, file);
//               data.append(`${base}.${fileType}name`, names[idx] || "");
//             });
//           }
//         });
//       });
//     });

//     try {
//       await axios.post("/CreateCoursess", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert("✅ Course created successfully!");
//       // Reset form after successful submission
//       setFormData({
//         coursename: "",
//         category: "",
//         courseduration: "6 months",
//         contentduration: { hours: 0, minutes: 0 },
//         price: 0,
//         level: "beginner",
//         language: "english",
//         certificates: "yes",
//         description: "",
//         whatYoullLearn: [],
//         thumbnail: null,
//         previewVideo: null,
//         instructor: {
//           name: "",
//           role: "",
//           socialmedia_id: "",
//         },
//       });
//       setChapters([
//         {
//           title: "",
//           lessons: [
//             {
//               lessonname: "",
//               audio: null,
//               video: null,
//               pdf: null,
//             },
//           ],
//         },
//       ]);
//     } catch (err) {
//       console.error("❌ Error creating course:", err);
//       alert("Failed to create course. Please check console for details.");
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{
//           mb: 4,
//           fontWeight: 700,
//           color: "#2c3e50",
//           textAlign: "center",
//           fontSize: { xs: "1.8rem", sm: "2.2rem" },
//         }}
//       >
//         Create New Course
//       </Typography>

//       {/* SECTION 1: COURSE INFORMATION */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           mb: 4,
//           borderRadius: 3,
//           border: "1px solid #e2e8f0",
//           backgroundColor: "#f8fafc",
//         }}
//       >
//         <Typography
//           variant="h5"
//           gutterBottom
//           sx={{
//             mb: 3,
//             fontWeight: 600,
//             color: "#2d3748",
//             display: "flex",
//             alignItems: "center",
//             "&:after": {
//               content: '""',
//               flex: 1,
//               ml: 2,
//               height: "1px",
//               backgroundColor: "#e2e8f0",
//             },
//           }}
//         >
//           <span>1. Course Information</span>
//         </Typography>

//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Course Name"
//               name="coursename"
//               value={formData.coursename}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: { borderRadius: 2, backgroundColor: "white" },
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: { borderRadius: 2, backgroundColor: "white" },
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Course Duration</InputLabel>
//               <Select
//                 name="courseduration"
//                 value={formData.courseduration}
//                 onChange={handleChange}
//                 label="Course Duration"
//                 sx={{ borderRadius: 2, backgroundColor: "white" }}
//               >
//                 <MenuItem value="6 months">6 months</MenuItem>
//                 <MenuItem value="1 year">1 year</MenuItem>
//                 <MenuItem value="2 years">2 years</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={6} md={4}>
//             <TextField
//               fullWidth
//               label="Price Amount"
//               name="price.amount"
//               type="number"
//               value={formData.price.amount}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: { borderRadius: 2, backgroundColor: "white" },
//               }}
//             />
//           </Grid>

//           <Grid item xs={6} md={4}>
//             <TextField
//               fullWidth
//               label="Discount (%)"
//               name="price.discount"
//               type="number"
//               value={formData.price.discount}
//               onChange={handleChange}
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: { borderRadius: 2, backgroundColor: "white" },
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Level</InputLabel>
//               <Select
//                 name="level"
//                 value={formData.level}
//                 onChange={handleChange}
//                 label="Level"
//                 sx={{ borderRadius: 2, backgroundColor: "white" }}
//               >
//                 <MenuItem value="beginner">Beginner</MenuItem>
//                 <MenuItem value="medium">Medium</MenuItem>
//                 <MenuItem value="hard">Hard</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Language</InputLabel>
//               <Select
//                 name="language"
//                 value={formData.language}
//                 onChange={handleChange}
//                 label="Language"
//                 sx={{ borderRadius: 2, backgroundColor: "white" }}
//               >
//                 <MenuItem value="english">English</MenuItem>
//                 <MenuItem value="tamil">Tamil</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Certificates</InputLabel>
//               <Select
//                 name="certificates"
//                 value={formData.certificates}
//                 onChange={handleChange}
//                 label="Certificates"
//                 sx={{ borderRadius: 2, backgroundColor: "white" }}
//               >
//                 <MenuItem value="yes">Yes</MenuItem>
//                 <MenuItem value="no">No</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Box sx={{ mb: 2 }}>
//               <Typography
//                 variant="subtitle1"
//                 gutterBottom
//                 sx={{ fontWeight: 500 }}
//               >
//                 Content Duration
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <TextField
//                     fullWidth
//                     label="Hours"
//                     name="contentduration.hours"
//                     type="number"
//                     value={formData.contentduration.hours}
//                     onChange={handleChange}
//                     InputProps={{
//                       sx: { borderRadius: 2, backgroundColor: "white" },
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     fullWidth
//                     label="Minutes"
//                     name="contentduration.minutes"
//                     type="number"
//                     value={formData.contentduration.minutes}
//                     onChange={handleChange}
//                     InputProps={{
//                       sx: { borderRadius: 2, backgroundColor: "white" },
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Box sx={{ mb: 2 }}>
//               <Typography
//                 variant="subtitle1"
//                 gutterBottom
//                 sx={{ fontWeight: 500 }}
//               >
//                 Media Files
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <Box
//                     sx={{
//                       border: "1px dashed #cbd5e0",
//                       borderRadius: 2,
//                       p: 2,
//                       textAlign: "center",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     <Typography variant="body2" sx={{ mb: 1 }}>
//                       Thumbnail
//                     </Typography>
//                     <input
//                       type="file"
//                       name="thumbnail"
//                       onChange={handleChange}
//                       accept="image/*"
//                     />
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Box
//                     sx={{
//                       border: "1px dashed #cbd5e0",
//                       borderRadius: 2,
//                       p: 2,
//                       textAlign: "center",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     <Typography variant="body2" sx={{ mb: 1 }}>
//                       Preview Video
//                     </Typography>
//                     <input
//                       type="file"
//                       name="previewVideo"
//                       onChange={handleChange}
//                       accept="video/*"
//                     />
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* SECTION 2: DESCRIPTION */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           mb: 4,
//           borderRadius: 3,
//           border: "1px solid #e2e8f0",
//           backgroundColor: "#f8fafc",
//         }}
//       >
//         <Typography
//           variant="h5"
//           gutterBottom
//           sx={{
//             mb: 3,
//             fontWeight: 600,
//             color: "#2d3748",
//             display: "flex",
//             alignItems: "center",
//             "&:after": {
//               content: '""',
//               flex: 1,
//               ml: 2,
//               height: "1px",
//               backgroundColor: "#e2e8f0",
//             },
//           }}
//         >
//           <span>2. Description</span>
//         </Typography>

//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Course Description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               multiline
//               rows={4}
//               sx={{ mb: 3 }}
//               InputProps={{
//                 sx: { borderRadius: 2, backgroundColor: "white" },
//               }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography
//               variant="subtitle1"
//               gutterBottom
//               sx={{ fontWeight: 500 }}
//             >
//               What You'll Learn
//             </Typography>
//             <Box
//               sx={{
//                 border: "1px solid #e2e8f0",
//                 borderRadius: 2,
//                 p: 2,
//                 backgroundColor: "white",
//               }}
//             >
//               <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//                 <TextField
//                   fullWidth
//                   value={whatYoullLearnInput}
//                   onChange={(e) => setWhatYoullLearnInput(e.target.value)}
//                   placeholder="Add learning point"
//                   InputProps={{
//                     sx: { borderRadius: 2 },
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={handleWhatYoullLearn}
//                   disabled={!whatYoullLearnInput.trim()}
//                   sx={{
//                     borderRadius: 2,
//                     bgcolor: "#4f46e5",
//                     "&:hover": { bgcolor: "#4338ca" },
//                   }}
//                 >
//                   Add
//                 </Button>
//               </Box>

//               <Box
//                 sx={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: 1,
//                   minHeight: 52,
//                   p: 1,
//                   borderRadius: 2,
//                   backgroundColor:
//                     formData.whatYoullLearn.length > 0
//                       ? "transparent"
//                       : "#f1f5f9",
//                 }}
//               >
//                 {formData.whatYoullLearn.length > 0 ? (
//                   formData.whatYoullLearn.map((item, index) => (
//                     <Chip
//                       key={index}
//                       label={item}
//                       onDelete={() => removeWhatYoullLearn(index)}
//                       sx={{
//                         borderRadius: 1,
//                         bgcolor: "#e0e7ff",
//                         color: "#4f46e5",
//                         "& .MuiChip-deleteIcon": {
//                           color: "#818cf8",
//                         },
//                       }}
//                     />
//                   ))
//                 ) : (
//                   <Typography
//                     variant="body2"
//                     sx={{ color: "#94a3b8", alignSelf: "center", ml: 1 }}
//                   >
//                     No learning points added yet
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* SECTION 3: INSTRUCTORS */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           mb: 4,
//           borderRadius: 3,
//           border: "1px solid #e2e8f0",
//           backgroundColor: "#f8fafc",
//         }}
//       >
//         <Typography
//           variant="h5"
//           gutterBottom
//           sx={{
//             mb: 3,
//             fontWeight: 600,
//             color: "#2d3748",
//             display: "flex",
//             alignItems: "center",
//             "&:after": {
//               content: '""',
//               flex: 1,
//               ml: 2,
//               height: "1px",
//               backgroundColor: "#e2e8f0",
//             },
//           }}
//         >
//           <span>3. Instructor Information</span>
//         </Typography>

//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Instructor Name"
//               name="instructor.name"
//               value={formData.instructor.name}
//               onChange={handleChange}
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: { borderRadius: 2, backgroundColor: "white" },
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Instructor Role"
//               name="instructor.role"
//               value={formData.instructor.role}
//               onChange={handleChange}
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: { borderRadius: 2, backgroundColor: "white" },
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Social Media ID"
//               name="instructor.socialmedia_id"
//               value={formData.instructor.socialmedia_id}
//               onChange={handleChange}
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: { borderRadius: 2, backgroundColor: "white" },
//               }}
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* SECTION 4: COURSE CONTENT */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           mb: 4,
//           borderRadius: 3,
//           border: "1px solid #e2e8f0",
//           backgroundColor: "#f8fafc",
//         }}
//       >
//         <Typography
//           variant="h5"
//           gutterBottom
//           sx={{
//             mb: 3,
//             fontWeight: 600,
//             color: "#2d3748",
//             display: "flex",
//             alignItems: "center",
//             "&:after": {
//               content: '""',
//               flex: 1,
//               ml: 2,
//               height: "1px",
//               backgroundColor: "#e2e8f0",
//             },
//           }}
//         >
//           <span>4. Course Content</span>
//         </Typography>

//         {chapters.map((chapter, cIndex) => (
//           <Paper
//             key={cIndex}
//             elevation={0}
//             sx={{
//               p: 3,
//               mb: 3,
//               borderRadius: 3,
//               border: "1px solid #e2e8f0",
//               backgroundColor: "white",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 2,
//                 pb: 2,
//                 borderBottom: "1px solid #e2e8f0",
//               }}
//             >
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                 Chapter {cIndex + 1}
//               </Typography>
//               <IconButton
//                 onClick={() => removeChapter(cIndex)}
//                 disabled={chapters.length <= 1}
//                 sx={{
//                   color: chapters.length > 1 ? "#ef4444" : "#cbd5e0",
//                   "&:hover": {
//                     backgroundColor:
//                       chapters.length > 1 ? "#fee2e2" : "transparent",
//                   },
//                 }}
//               >
//                 <RemoveCircle />
//               </IconButton>
//             </Box>

//             <TextField
//               fullWidth
//               label="Chapter Title"
//               name="title"
//               value={chapter.title}
//               onChange={(e) => handleChapterChange(cIndex, e)}
//               sx={{ mb: 3 }}
//               InputProps={{
//                 sx: { borderRadius: 2 },
//               }}
//             />

//             <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
//               Lessons
//             </Typography>

//             {chapter.lessons.map((lesson, lIndex) => (
//               <Box
//                 key={lIndex}
//                 sx={{
//                   p: 3,
//                   mb: 2,
//                   borderRadius: 2,
//                   border: "1px solid #e2e8f0",
//                   position: "relative",
//                 }}
//               >
//                 <IconButton
//                   sx={{
//                     position: "absolute",
//                     top: 8,
//                     right: 8,
//                     color: chapter.lessons.length > 1 ? "#ef4444" : "#cbd5e0",
//                     "&:hover": {
//                       backgroundColor:
//                         chapter.lessons.length > 1 ? "#fee2e2" : "transparent",
//                     },
//                   }}
//                   onClick={() => removeLesson(cIndex, lIndex)}
//                   disabled={chapter.lessons.length <= 1}
//                 >
//                   <RemoveCircle />
//                 </IconButton>

//                 <TextField
//                   fullWidth
//                   label="Lesson Name"
//                   name="lessonname"
//                   value={lesson.lessonname}
//                   onChange={(e) => handleLessonChange(cIndex, lIndex, e)}
//                   sx={{ mb: 2 }}
//                   InputProps={{
//                     sx: { borderRadius: 2 },
//                   }}
//                 />

//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth sx={{ mb: 2 }}>
//                       <InputLabel shrink>Audio Files</InputLabel>
//                       <Box
//                         sx={{
//                           border: "1px dashed #cbd5e0",
//                           borderRadius: 2,
//                           p: 2,
//                           mt: 2,
//                         }}
//                       >
//                         <input
//                           type="file"
//                           name="audio"
//                           multiple
//                           onChange={(e) =>
//                             handleLessonChange(cIndex, lIndex, e)
//                           }
//                           accept="audio/*"
//                         />
//                       </Box>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth sx={{ mb: 2 }}>
//                       <InputLabel shrink>Video Files</InputLabel>
//                       <Box
//                         sx={{
//                           border: "1px dashed #cbd5e0",
//                           borderRadius: 2,
//                           p: 2,
//                           mt: 2,
//                         }}
//                       >
//                         <input
//                           type="file"
//                           name="video"
//                           multiple
//                           onChange={(e) =>
//                             handleLessonChange(cIndex, lIndex, e)
//                           }
//                           accept="video/*"
//                         />
//                       </Box>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth sx={{ mb: 2 }}>
//                       <InputLabel shrink>PDF Files</InputLabel>
//                       <Box
//                         sx={{
//                           border: "1px dashed #cbd5e0",
//                           borderRadius: 2,
//                           p: 2,
//                           mt: 2,
//                         }}
//                       >
//                         <input
//                           type="file"
//                           name="pdf"
//                           multiple
//                           onChange={(e) =>
//                             handleLessonChange(cIndex, lIndex, e)
//                           }
//                           accept="application/pdf"
//                         />
//                       </Box>
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Box>
//             ))}

//             <Button
//               variant="outlined"
//               startIcon={<AddCircle />}
//               onClick={() => addLesson(cIndex)}
//               sx={{
//                 mt: 1,
//                 borderRadius: 2,
//                 borderColor: "#c7d2fe",
//                 color: "#4f46e5",
//                 "&:hover": {
//                   borderColor: "#a5b4fc",
//                   backgroundColor: "#eef2ff",
//                 },
//               }}
//             >
//               Add Lesson
//             </Button>
//           </Paper>
//         ))}

//         <Button
//           variant="contained"
//           startIcon={<AddCircle />}
//           onClick={addChapter}
//           sx={{
//             mt: 2,
//             borderRadius: 2,
//             bgcolor: "#4f46e5",
//             "&:hover": { bgcolor: "#4338ca" },
//           }}
//         >
//           Add Chapter
//         </Button>
//       </Paper>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mt: 4,
//         }}
//       >
//         <Button
//           type="submit"
//           variant="contained"
//           size="large"
//           sx={{
//             px: 6,
//             py: 1.5,
//             borderRadius: 2,
//             bgcolor: "#4f46e5",
//             fontSize: "1.1rem",
//             fontWeight: 600,
//             "&:hover": {
//               bgcolor: "#4338ca",
//               transform: "translateY(-2px)",
//               boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.3)",
//             },
//           }}
//         >
//           Create Course
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CreateCourses;



//sx: { borderRadius: 2, backgroundColor: "white",width:"1100px" },

import React, { useState, useEffect } from "react";
import axios from "../../../../Utils/api";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  Grid,
  IconButton,
  Chip,
  FormControlLabel, 
  Checkbox,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const CreateCourses = () => {
  const [formData, setFormData] = useState({
    CourseMotherId: "",
    useAutoCourseMotherId: true,
    coursename: "",
    category: "",
    courseduration: "6 months",
    contentduration: { hours: 0, minutes: 0 },
    price: {
      amount: 0,
      currency: "INR",
      discount: 0,
      finalPrice: 0,
    },
    level: "beginner",
    language: "english",
    certificates: "yes",
    description: "",
    whatYoullLearn: [],
    thumbnail: null,
    previewVideo: null,
    instructor: {
      name: "",
      role: "",
      socialmedia_id: "",
    },
  });

  const [chapters, setChapters] = useState([
    {
      title: "",
      lessons: [
        {
          lessonname: "",
          audio: [],
          video: [],
          pdf: [],
        },
      ],
    },
  ]);

  const [whatYoullLearnInput, setWhatYoullLearnInput] = useState("");

  // Calculate final price whenever amount or discount changes
  useEffect(() => {
    const amount = parseFloat(formData.price.amount) || 0;
    const discount = parseFloat(formData.price.discount) || 0;
    const finalPrice = amount * (1 - discount / 100);

    setFormData((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        finalPrice: parseFloat(finalPrice.toFixed(2)),
      },
    }));
  }, [formData.price.amount, formData.price.discount]);

  const handleChange = (e) => {
const { name, value, files, checked } = e.target; // Added checked

    if (name === "useAutoCourseMotherId") {
      setFormData((prev) => ({
        ...prev,
        useAutoCourseMotherId: checked,
        CourseMotherId: checked ? "" : prev.CourseMotherId, // Use prev.CourseMotherId
      }));
    } else if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name.startsWith("instructor.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          [key]: value,
        },
      }));
    } else if (name.startsWith("contentduration.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contentduration: {
          ...prev.contentduration,
          [key]: parseInt(value) || 0,
        },
      }));
    } else if (name.startsWith("price.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleWhatYoullLearn = () => {
    if (whatYoullLearnInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        whatYoullLearn: [...prev.whatYoullLearn, whatYoullLearnInput.trim()],
      }));
      setWhatYoullLearnInput("");
    }
  };

  const removeWhatYoullLearn = (index) => {
    setFormData((prev) => ({
      ...prev,
      whatYoullLearn: prev.whatYoullLearn.filter((_, i) => i !== index),
    }));
  };

  const handleChapterChange = (index, e) => {
    const newChapters = [...chapters];
    newChapters[index][e.target.name] = e.target.value;
    setChapters(newChapters);
  };

  const handleLessonChange = (chapterIndex, lessonIndex, e) => {
    const { name, value, files } = e.target;
    const newChapters = [...chapters];
    const lesson = newChapters[chapterIndex].lessons[lessonIndex];

    if (files && files.length > 0) {
      lesson[name] = Array.from(files);
      // Also store names without extension
      lesson[`${name}name`] = Array.from(files).map((f) =>
        f.name.replace(/\.[^/.]+$/, "")
      );
    } else {
      lesson[name] = value;
    }

    setChapters(newChapters);
  };

  const addChapter = () => {
    setChapters([
      ...chapters,
      {
        title: "",
        lessons: [
          {
            lessonname: "",
            audio: null,
            video: null,
            pdf: null,
          },
        ],
      },
    ]);
  };

  const removeChapter = (index) => {
    if (chapters.length > 1) {
      setChapters(chapters.filter((_, i) => i !== index));
    }
  };

  const addLesson = (chapterIndex) => {
    const newChapters = [...chapters];
    newChapters[chapterIndex].lessons.push({
      lessonname: "",
      audio: null,
      video: null,
      pdf: null,
    });
    setChapters(newChapters);
  };

  const removeLesson = (chapterIndex, lessonIndex) => {
    const newChapters = [...chapters];
    if (newChapters[chapterIndex].lessons.length > 1) {
      newChapters[chapterIndex].lessons = newChapters[
        chapterIndex
      ].lessons.filter((_, i) => i !== lessonIndex);
      setChapters(newChapters);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();

    // Add top-level fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "useAutoCourseMotherId") return; // Skip this field
      if (key === "CourseMotherId" && formData.useAutoCourseMotherId) return; // Skip if auto-generated
      if (key === "instructor") {
        Object.entries(value).forEach(([subkey, subvalue]) => {
          data.append(`instructor.${subkey}`, subvalue);
        });
      } else if (key === "contentduration") {
        Object.entries(value).forEach(([subkey, subvalue]) => {
          data.append(`contentduration.${subkey}`, subvalue);
        });
      } else if (key === "price") {
        Object.entries(value).forEach(([subkey, subvalue]) => {
          data.append(`price.${subkey}`, subvalue);
        });
      } else if (key === "whatYoullLearn") {
        value.forEach((item, index) => {
          data.append(`whatYoullLearn[${index}]`, item);
        });
      } else if (key === "thumbnail" || key === "previewVideo") {
        if (value) {
          data.append(key, value);
          // Save raw name for thumbnail and previewVideo
          const rawName = value.name.replace(/\.[^/.]+$/, "");
          data.append(`${key}name`, rawName);
        }
      } else {
        data.append(key, value);
      }
    });

    // Add chapters and lessons
    chapters.forEach((chapter, cIndex) => {
      data.append(`chapters[${cIndex}].title`, chapter.title);

      chapter.lessons.forEach((lesson, lIndex) => {
        const base = `chapters[${cIndex}].lessons[${lIndex}]`;

        data.append(`${base}.lessonname`, lesson.lessonname);

        // Handle each file type with its name
        ["audio", "video", "pdf"].forEach((fileType) => {
          const files = lesson[fileType];
          const names = lesson[`${fileType}name`] || [];

          if (files && Array.isArray(files)) {
            files.forEach((file, idx) => {
              data.append(`${base}.${fileType}`, file);
              data.append(`${base}.${fileType}name`, names[idx] || "");
            });
          }
        });
      });
    });

    try {
      await axios.post("/createcourses", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Course created successfully!");
      // Reset form after successful submission
      setFormData({
        coursename: "",
        category: "",
        courseduration: "6 months",
        contentduration: { hours: 0, minutes: 0 },
        price: 0,
        level: "beginner",
        language: "english",
        certificates: "yes",
        description: "",
        whatYoullLearn: [],
        thumbnail: null,
        previewVideo: null,
        instructor: {
          name: "",
          role: "",
          socialmedia_id: "",
        },
      });
      setChapters([
        {
          title: "",
          lessons: [
            {
              lessonname: "",
              audio: null,
              video: null,
              pdf: null,
            },
          ],
        },
      ]);
    } catch (err) {
      console.error("❌ Error creating course:", err);
      alert("Failed to create course. Please check console for details.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#2c3e50",
          textAlign: "center",
          fontSize: { xs: "1.8rem", sm: "2.2rem" },
        }}
      >
        Create New Course
      </Typography>

      {/* SECTION 1: COURSE INFORMATION */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          backgroundColor: "#f8fafc",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#2d3748",
            display: "flex",
            alignItems: "center",
            "&:after": {
              content: '""',
              flex: 1,
              ml: 2,
              height: "1px",
              backgroundColor: "#e2e8f0",
            },
          }}
        >
          <span>1. Course Information</span>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Course Name"
              name="coursename"
              value={formData.coursename}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "white" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "white" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Course Duration</InputLabel>
              <Select
                name="courseduration"
                value={formData.courseduration}
                onChange={handleChange}
                label="Course Duration"
                sx={{ borderRadius: 2, backgroundColor: "white" }}
              >
                <MenuItem value="6 months">6 months</MenuItem>
                <MenuItem value="1 year">1 year</MenuItem>
                <MenuItem value="2 years">2 years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="useAutoCourseMotherId"
                      checked={formData.useAutoCourseMotherId}
                      onChange={handleChange}
                    />
                  }
                  label="Auto-generate CourseMotherId"
                />
                {!formData.useAutoCourseMotherId && (
                  <TextField
                    fullWidth
                    label="Course Mother ID"
                    name="CourseMotherId"
                    value={formData.CourseMotherId}
                    onChange={handleChange}
                    required
                    disabled={formData.useAutoCourseMotherId}
                    InputProps={{
                      sx: { borderRadius: 2, backgroundColor: "white" },
                    }}
                  />
                )}
              </Box>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              label="Price Amount"
              name="price.amount"
              type="number"
              value={formData.price.amount}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "white" },
              }}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              label="Discount (%)"
              name="price.discount"
              type="number"
              value={formData.price.discount}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "white" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Level</InputLabel>
              <Select
                name="level"
                value={formData.level}
                onChange={handleChange}
                label="Level"
                sx={{ borderRadius: 2, backgroundColor: "white" }}
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Language</InputLabel>
              <Select
                name="language"
                value={formData.language}
                onChange={handleChange}
                label="Language"
                sx={{ borderRadius: 2, backgroundColor: "white" }}
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="tamil">Tamil</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Certificates</InputLabel>
              <Select
                name="certificates"
                value={formData.certificates}
                onChange={handleChange}
                label="Certificates"
                sx={{ borderRadius: 2, backgroundColor: "white" }}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: 500 }}
              >
                Content Duration
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Hours"
                    name="contentduration.hours"
                    type="number"
                    value={formData.contentduration.hours}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: 2, backgroundColor: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Minutes"
                    name="contentduration.minutes"
                    type="number"
                    value={formData.contentduration.minutes}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: 2, backgroundColor: "white" },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: 500 }}
              >
                Media Files
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      border: "1px dashed #cbd5e0",
                      borderRadius: 2,
                      p: 2,
                      textAlign: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Thumbnail
                    </Typography>
                    <input
                      type="file"
                      name="thumbnail"
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      border: "1px dashed #cbd5e0",
                      borderRadius: 2,
                      p: 2,
                      textAlign: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Preview Video
                    </Typography>
                    <input
                      type="file"
                      name="previewVideo"
                      onChange={handleChange}
                      accept="video/*"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* SECTION 2: DESCRIPTION */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          backgroundColor: "#f8fafc",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#2d3748",
            display: "flex",
            alignItems: "center",
            "&:after": {
              content: '""',
              flex: 1,
              ml: 2,
              height: "1px",
              backgroundColor: "#e2e8f0",
            },
          }}
        >
          <span>2. Description</span>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Course Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "white" },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 500 }}
            >
              What You'll Learn
            </Typography>
            <Box
              sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 2,
                p: 2,
                backgroundColor: "white",
              }}
            >
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  value={whatYoullLearnInput}
                  onChange={(e) => setWhatYoullLearnInput(e.target.value)}
                  placeholder="Add learning point"
                  InputProps={{
                    sx: { borderRadius: 2 },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleWhatYoullLearn}
                  disabled={!whatYoullLearnInput.trim()}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "#4f46e5",
                    "&:hover": { bgcolor: "#4338ca" },
                  }}
                >
                  Add
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  minHeight: 52,
                  p: 1,
                  borderRadius: 2,
                  backgroundColor:
                    formData.whatYoullLearn.length > 0
                      ? "transparent"
                      : "#f1f5f9",
                }}
              >
                {formData.whatYoullLearn.length > 0 ? (
                  formData.whatYoullLearn.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      onDelete={() => removeWhatYoullLearn(index)}
                      sx={{
                        borderRadius: 1,
                        bgcolor: "#e0e7ff",
                        color: "#4f46e5",
                        "& .MuiChip-deleteIcon": {
                          color: "#818cf8",
                        },
                      }}
                    />
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: "#94a3b8", alignSelf: "center", ml: 1 }}
                  >
                    No learning points added yet
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* SECTION 3: INSTRUCTORS */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          backgroundColor: "#f8fafc",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#2d3748",
            display: "flex",
            alignItems: "center",
            "&:after": {
              content: '""',
              flex: 1,
              ml: 2,
              height: "1px",
              backgroundColor: "#e2e8f0",
            },
          }}
        >
          <span>3. Instructor Information</span>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Instructor Name"
              name="instructor.name"
              value={formData.instructor.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "white" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Instructor Role"
              name="instructor.role"
              value={formData.instructor.role}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "white" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Social Media ID"
              name="instructor.socialmedia_id"
              value={formData.instructor.socialmedia_id}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "white" },
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* SECTION 4: COURSE CONTENT */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          backgroundColor: "#f8fafc",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#2d3748",
            display: "flex",
            alignItems: "center",
            "&:after": {
              content: '""',
              flex: 1,
              ml: 2,
              height: "1px",
              backgroundColor: "#e2e8f0",
            },
          }}
        >
          <span>4. Course Content</span>
        </Typography>

        {chapters.map((chapter, cIndex) => (
          <Paper
            key={cIndex}
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                pb: 2,
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Chapter {cIndex + 1}
              </Typography>
              <IconButton
                onClick={() => removeChapter(cIndex)}
                disabled={chapters.length <= 1}
                sx={{
                  color: chapters.length > 1 ? "#ef4444" : "#cbd5e0",
                  "&:hover": {
                    backgroundColor:
                      chapters.length > 1 ? "#fee2e2" : "transparent",
                  },
                }}
              >
                <RemoveCircle />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              label="Chapter Title"
              name="title"
              value={chapter.title}
              onChange={(e) => handleChapterChange(cIndex, e)}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
            />

            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Lessons
            </Typography>

            {chapter.lessons.map((lesson, lIndex) => (
              <Box
                key={lIndex}
                sx={{
                  p: 3,
                  mb: 2,
                  borderRadius: 2,
                  border: "1px solid #e2e8f0",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: chapter.lessons.length > 1 ? "#ef4444" : "#cbd5e0",
                    "&:hover": {
                      backgroundColor:
                        chapter.lessons.length > 1 ? "#fee2e2" : "transparent",
                    },
                  }}
                  onClick={() => removeLesson(cIndex, lIndex)}
                  disabled={chapter.lessons.length <= 1}
                >
                  <RemoveCircle />
                </IconButton>

                <TextField
                  fullWidth
                  label="Lesson Name"
                  name="lessonname"
                  value={lesson.lessonname}
                  onChange={(e) => handleLessonChange(cIndex, lIndex, e)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    sx: { borderRadius: 2 },
                  }}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel shrink>Audio Files</InputLabel>
                      <Box
                        sx={{
                          border: "1px dashed #cbd5e0",
                          borderRadius: 2,
                          p: 2,
                          mt: 2,
                        }}
                      >
                        <input
                          type="file"
                          name="audio"
                          multiple
                          onChange={(e) =>
                            handleLessonChange(cIndex, lIndex, e)
                          }
                          accept="audio/*"
                        />
                      </Box>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel shrink>Video Files</InputLabel>
                      <Box
                        sx={{
                          border: "1px dashed #cbd5e0",
                          borderRadius: 2,
                          p: 2,
                          mt: 2,
                        }}
                      >
                        <input
                          type="file"
                          name="video"
                          multiple
                          onChange={(e) =>
                            handleLessonChange(cIndex, lIndex, e)
                          }
                          accept="video/*"
                        />
                      </Box>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel shrink>PDF Files</InputLabel>
                      <Box
                        sx={{
                          border: "1px dashed #cbd5e0",
                          borderRadius: 2,
                          p: 2,
                          mt: 2,
                        }}
                      >
                        <input
                          type="file"
                          name="pdf"
                          multiple
                          onChange={(e) =>
                            handleLessonChange(cIndex, lIndex, e)
                          }
                          accept="application/pdf"
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            ))}

            <Button
              variant="outlined"
              startIcon={<AddCircle />}
              onClick={() => addLesson(cIndex)}
              sx={{
                mt: 1,
                borderRadius: 2,
                borderColor: "#c7d2fe",
                color: "#4f46e5",
                "&:hover": {
                  borderColor: "#a5b4fc",
                  backgroundColor: "#eef2ff",
                },
              }}
            >
              Add Lesson
            </Button>
          </Paper>
        ))}

        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={addChapter}
          sx={{
            mt: 2,
            borderRadius: 2,
            bgcolor: "#4f46e5",
            "&:hover": { bgcolor: "#4338ca" },
          }}
        >
          Add Chapter
        </Button>
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            px: 6,
            py: 1.5,
            borderRadius: 2,
            bgcolor: "#4f46e5",
            fontSize: "1.1rem",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#4338ca",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.3)",
            },
          }}
        >
          Create Course
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCourses;

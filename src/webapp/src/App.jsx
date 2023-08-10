import "./App.css";
import { Routes, Route } from "react-router-dom";

import ExamineeSignIn from "./pages/examinee_signin";
import ProctorSignIn from "./pages/proctor_signin";
import ProctorCreateExam from "./pages/proctor_create_exam";
import ProctorCreateExamSuccess from "./pages/proctor_create_exam_success";
import ExamineeTakeExam from "./pages/examinee_take_exam";
import ExamineeTakeExamSuccess from "./pages/examinee_take_exam_success";

function App() {
	return (
		<>
			<div className="App">
				<Routes>
					<Route path="/" element={<ExamineeSignIn />} />
					<Route path="examinee/take_exam" element={<ExamineeTakeExam />} />
					<Route
						path="examinee/take_exam/success"
						element={<ExamineeTakeExamSuccess />}
					/>

					<Route path="proctor" element={<ProctorSignIn />} />
					<Route path="proctor/create_exam" element={<ProctorCreateExam />} />
					<Route
						path="proctor/create_exam/success"
						element={<ProctorCreateExamSuccess />}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;

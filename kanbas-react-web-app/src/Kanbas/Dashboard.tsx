import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard({
  courses, course, setCourse,
  addNewCourse, deleteCourse, updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isStudent = currentUser?.role === "STUDENT";

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button 
          onClick={() => setEnrolling(!enrolling)} 
          className="float-end btn btn-primary"
        >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>
      <hr />
      {!isStudent && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse}>
              Add
            </button>
            <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse}
                    id="wd-update-course-click">
              Update
            </button>
          </h5>
          <input 
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea 
            value={course.description}
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </>
      )}
      <h2 id="wd-dashboard-published">
        My Courses ({courses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              {isStudent ? (
                <div className="card">
                  <div className="card-body">
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="text-decoration-none text-dark"
                    >
                      <img 
                        src={`/images/${course.image || "bow.jpg"}`} 
                        className="card-img-top"
                        style={{ height: "150px", objectFit: "cover" }}
                        alt={course.name}
                      />
                      <h5 className="card-title mt-2">
                        {enrolling && (
                          <button 
                            className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`}
                            onClick={(event) => {
                              event.preventDefault();
                              updateEnrollment(course._id, !course.enrolled);
                            }}
                          >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                        {course.name}
                      </h5>
                      <p className="card-text" style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>{course.description}</p>
                    </Link>
                    <div className="mt-2">
                      <Link
                        to={`/Kanbas/Courses/${course._id}/Home`}
                        className="btn btn-primary"
                      >
                        Go to Course
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <img 
                    src={`/images/${course.image || "bow.jpg"}`} 
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                    alt={course.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {enrolling && (
                        <button 
                          className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`}
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                          }}
                        >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {course.name}
                    </h5>
                    <p className="card-text" style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>{course.description}</p>
                    <div className="mt-2">
                      <Link
                        to={`/Kanbas/Courses/${course._id}/Home`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>
                      <button 
                        onClick={() => setCourse(course)}
                        className="btn btn-warning float-end ms-2"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteCourse(course._id)}
                        className="btn btn-danger float-end"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

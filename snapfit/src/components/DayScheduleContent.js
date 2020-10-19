import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import AddScheduleBtn from "./AddScheduleBtn";
import AddScheduleForm from "./AddScheduleForm";
import DispatchContext from "../DispatchContext";
import "../styles/dayschedulecontent.css";

function DayScheduleContent(props) {
  const appDispatch = useContext(DispatchContext);
  const day = props.day;
  const exercises = props.data.exercises;
  const [addState, setAddState] = useState(false);

  useEffect(() => {
    console.log("AddButton " + addState);
  }, [addState]);

  function handleClicked(e) {
    const index = e.target.getAttribute("index");
    appDispatch({ type: "deletSchedule", value: { day: props.day, index: index } });
  }
  return (
    <div>
      {addState ? (
        <div className="schedule-form-box">
          <AddScheduleForm day={day} setState={setAddState} />
        </div>
      ) : (
        <div>
          <div className="list-box overflow-auto">
            <ul>
              {exercises.length !== 0 ? (
                exercises.map((exercise, index) => {
                  return (
                    <li key={index}>
                      <Button className="shadow" index={index} onClick={handleClicked} variant="light">
                        {exercise}
                      </Button>
                    </li>
                  );
                })
              ) : (
                <div className="no-schedule-info">None</div>
              )}
            </ul>
          </div>
          <AddScheduleBtn setState={setAddState} className="btn-add-schedule" />
        </div>
      )}
    </div>
  );
}

export default DayScheduleContent;

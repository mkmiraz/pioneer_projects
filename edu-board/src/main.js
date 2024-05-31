const studentCreateForm = document.getElementById("student-create-form");
const studentDataList = document.getElementById("student-data-list");
const studentResultForm = document.getElementById("studentResultForm");
const msg = document.querySelector(".msg");
const btnClose = document.querySelectorAll(".btn-close");

const studentResultView = document.getElementById("studentResultView");

/**
 * Get All Students Data
 * @param {*}
 */
const getAllStudents = (e) => {
  const data = JSON.parse(localStorage.getItem("students"));

  let lsData = "";
  if (data) {
    data.map((items, index) => {
      lsData += `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${items.name}</td>
                      <td>${items.roll}</td>
                      <td>${items.reg}</td>
                      <td>${items.board}</td>
                      <td>${items.exam}</td>
                      <td>
                    
                        
                       ${
                         items.result
                           ? '<button class="btn btn-sm btn-success" onclick="getViewResultData(\'' +
                             items.id +
                             '\')" data-bs-toggle="modal" data-bs-target="#student-result-view">View Result</button>'
                           : '<button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#student-result-form" onclick="getSingleStudentID(\'' +
                             items.id +
                             "')\">Add Result</button>"
                       }
                      </td>
                      <td>
                        <button class="btn btn-sm btn-warning">
                          <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger">
                          <i class="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
      `;
    });
  } else {
  }

  studentDataList.innerHTML = lsData;
};
getAllStudents();

/**
 * Create Students data form
 * @param {*} e
 */

studentCreateForm.onsubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  if (
    !data.name ||
    !data.father ||
    !data.mother ||
    !data.date ||
    !data.roll ||
    !data.reg ||
    !data.inst ||
    !data.board ||
    !data.year ||
    !data.exam ||
    !data.group ||
    !data.type
  ) {
    msg.innerHTML = createAlert("All fields are required");
  } else {
    let oldData = [];
    // check old data exists or not
    if (localStorage.getItem("students")) {
      oldData = JSON.parse(localStorage.getItem("students"));
    }

    oldData.push({
      ...data,
      id: createID(),
      createdAt: Date.now(),
      updatedAt: null,
      result: null,
    });

    localStorage.setItem("students", JSON.stringify(oldData));
    e.target.reset();
    btnClose.forEach((item) => item.click());
    getAllStudents();
  }
};

/**
 * get single id
 * @param {*} id
 */
const getSingleStudentID = (id) => {
  studentResultForm.querySelector('input[name="id"]').value = id;
};
/**
 * Create Rusult
 * @param {*} e
 */
studentResultForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // get data
  const students = JSON.parse(localStorage.getItem("students"));

  // add result
  const updatedData = students.map((item) => {
    if (item.id == data.id) {
      return {
        ...item,
        result: {
          bangla: data.bangla,
          english: data.english,
          math: data.math,
          science: data.science,
          social: data.social,
          religion: data.religion,
        },
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("students", JSON.stringify(updatedData));
  e.target.reset();
  btnClose.forEach((item) => item.click());
  getAllStudents();
};

/**
 * Get single result show
 * @param {*} id
 */
const getViewResultData = (id) => {
  const studentData = JSON.parse(localStorage.getItem("students"));

  // get single data
  const data = studentData.find((item) => item.id == id);

  studentResultView.querySelector('input[name="id"]').value = data.id;

  studentResultView.querySelector('input[name="ban"]').value =
    data.result.bangla;
  studentResultView.querySelector('input[name="eng"]').value =
    data.result.english;
  studentResultView.querySelector('input[name="mat"]').value = data.result.math;
  studentResultView.querySelector('input[name="scn"]').value =
    data.result.science;
  studentResultView.querySelector('input[name="soc"]').value =
    data.result.social;
  studentResultView.querySelector('input[name="relg"]').value =
    data.result.religion;
};

studentResultView.onsubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const students = JSON.parse(localStorage.getItem("students"));

  const updatedData = students.map((item) => {
    if (item.id == data.id) {
      return {
        ...item,
        result: {
          bangla: data.ban,
          english: data.eng,
          math: data.mat,
          science: data.scn,
          social: data.soc,
          religion: data.relg,
        },
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("students", JSON.stringify(updatedData));
  btnClose.forEach((item) => item.click());
  getAllStudents();
};

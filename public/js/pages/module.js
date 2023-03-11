function updateGroup(id) {
  // check input rỗng: alert không để input rỗng
  const a = document.querySelector(`#tennhomhocphan_${id}`);
  $.ajax({
    type: "post",
    url: "./module/updateGroup",
    data: {
      id: id,
      name: a.value,
    },
    success: function (response) {
      loadDataClass();
      //   One.helpers("jq-notify", {
      //     type: "success",
      //     icon: "fa fa-check me-1",
      //     message: "Cập nhật nhóm thành công!",
      //   });
    },
  });
}

function openModalUpdateGroup(id) {
  $.ajax({
    type: "post",
    url: "./module/getClass",
    data: {
      id: id,
    },
    success: function (response) {
      const obj = JSON.parse(response);
      $("#modal-update__class-name").val(obj.tennhom);
      $("#modal-update__class-note").val(obj.ghichu);
      $("#modal-update__class-id").val(obj.manhom);
    },
  });
}

$("#update_class").click(function (e) {
  $.ajax({
    type: "post",
    url: "./module/updateClass",
    data: {
      id: $("#modal-update__class-id").val(),
      name: $("#modal-update__class-name").val(),
      note: $("#modal-update__class-note").val(),
    },
    success: function (response) {
      loadDataClass();
      $("#modal-update-group").modal("hide");
    },
  });
});

function deleteGroup(id) {
  $.ajax({
    type: "post",
    url: "./module/deleteGroup",
    data: {
      id: id,
    },
    success: function (response) {
      loadDataClass();
      // One.helpers("jq-notify", {
      //   type: "success",
      //   icon: "fa fa-check me-1",
      //   message: "Xoá nhóm thành công!",
      // });
    },
  });
}

function deleteClass(id) {
  $.ajax({
    type: "post",
    url: "./module/deleteClass",
    data: {
      id: id,
    },
    success: function (response) {
      loadDataClass();
      // One.helpers("jq-notify", {
      //   type: "success",
      //   icon: "fa fa-check me-1",
      //   message: "Xoá nhóm thành công!",
      // });
    },
  });
}

function updateClass(id) {
  $.ajax({
    type: "post",
    url: "./module/updateClass",
    data: {
      id: id,
      value: "",
    },
    success: function (response) {
      loadDataClass();
    },
  });
}

function loadDataGroup() {
  fetch("./module/loadDataGroup")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((item) => {
        html += `<div class="col-6">
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="${
                      item.manhomhocphan
                    }" id="group-${item.manhomhocphan}" name="ds-grp" ${
          item.manhomhocphan === "0" ? "checked" : ""
        }>
                    <label class="form-check-label" for="group-${
                      item.manhomhocphan
                    }">${item.tennhomhocphan}</label>
                </div>
            </div>`;
      });
      $("#list-group").html(html);
    })
    .catch((error) => console.error(error));
}

function loadDataClass() {
  let html = "";
  let htmlGhiChu = "";
  fetch("./module/loadDataClass")
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      result.forEach((item) => {
        html += `<div>
                <div class="heading-group d-flex align-items-center">
                    <h2 class="content-heading">${item.tennhomhocphan}</h2>
                    <div class="dropdown">
                        <button type="button" class="btn btn-sm btn-alt-secondary space-x-1 ms-2" id="dropdown-content-rich-primary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fa fa-fw fa-pencil"></i>
                        </button>
                        <div class="dropdown-menu p-1" aria-labelledby="dropdown-content-rich-primary">
                          <div class="p-2" style="width:200px">
                            <div class="mb-3">
                              <label class="form-label" for="tennhomhocphan_${item.manhomhocphan}">Cập nhật nhóm</label>
                              <input type="email" class="form-control" id="tennhomhocphan_${item.manhomhocphan}" name="tennhomhocphan_${item.manhomhocphan}" value="${item.tennhomhocphan}">
                            </div>
                            <button class="btn btn-sm btn-danger delete_group" onclick="deleteGroup(${item.manhomhocphan})">Xoá</button>
                            <button class="btn btn-sm btn-primary update_group" data-id="${item.manhomhocphan}" onclick="updateGroup(${item.manhomhocphan})">Cập nhật</button>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="row">`;
        if (item.class.length == 0) {
          html += `<p class="text-center">Không có lớp nào</p>`;
        } else {
          item.class.forEach((element) => {
            if (element.ghichu != "") {
              htmlGhiChu = `<p class="block-class-note">${element.ghichu}</p>`;
            }
            html += `
            <div class="col-sm-6 col-lg-6 col-xl-3">
              <!-- <a class="block block-rounded block-link-shadow" href="./module/detail/${element.manhom}"> </a> -->
              <div class="block block-rounded">
                <div class="block-header block-header-default">
                    <h3 class="block-title block-class-name">${element.tennhom}</h3>
                    <div class="block-options">
                      <div class="dropdown">
                        <button type="button" class="btn btn-alt-secondary dropdown-toggle module__dropdown" id="dropdown-default-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-id="${element.manhom}">
                          <i class="si si-settings"></i>
                        </button>
                        <div class="dropdown-menu fs-sm" aria-labelledby="dropdown-default-light" style="">
                          <a class="nav-main-link dropdown-item" href="module/detail/${element.manhom}" target="_blank">
                            <i class="nav-main-link-icon si si-info me-2 text-dark"></i>
                            <span class="nav-main-link-name fw-normal">Danh sách sinh viên</span>
                          </a>
                          <!-- Sao chep ma moi -->
                          <a class="nav-main-link dropdown-item btn-update-group" data-bs-toggle="modal" data-bs-target="#modal-update-group" href="javascript:void(0)" data-id="${element.manhom}" onclick="openModalUpdateGroup(${element.manhom})">
                            <i class="nav-main-link-icon si si-pencil me-2 text-dark"></i>
                            <span class="nav-main-link-name fw-normal">Sửa thông tin</span>
                          </a>
                          <a class="nav-main-link dropdown-item btn-delete-group" href="javascript:void(0)" data-id="${element.manhom}" onclick="deleteClass(${element.manhom})">
                            <i class="nav-main-link-icon si si-trash me-2 text-danger"></i>
                            <span class="nav-main-link-name fw-normal text-danger">Xoá nhóm</span>
                          </a>
                        </div>
                      </div>
                        <!-- <button type="button" class="btn-light btn-block-option text-dark" data-id="${element.manhom}"><i class="si si-settings"></i></button> -->
                    </div>
                </div>
                <div class="block-content">
                  ${htmlGhiChu}
                  <p>Sỉ số: ${element.siso}</p>
                </div>
              </div>
            </div>`;
          });
        }
        html += `</div></div>`;
      });
      $("#class-group").html(html);
    })
    .catch((error) => console.error(error));
}

$("#add_group").click(function (e) {
  e.preventDefault();
  $.ajax({
    type: "post",
    url: "./module/addGroup",
    data: {
      name: $("#name_group").val(),
    },
    success: function (response) {
      loadDataGroup();
      $("#collapseExample").collapse("hide");
    },
  });
});

$("#add_class").click(function (e) {
  e.preventDefault();
  $.ajax({
    type: "post",
    url: "./module/addClass",
    data: {
      name: $("#class_name").val(),
      note: $("#class_note").val() != "" ? $("#class_note").val() : null,
      group: $('input[name="ds-grp"]:checked').val(),
    },
    success: function (response) {
      $("#class_name").val("");
      $("#class_note").val("");
      $("#modal-add-group").modal("hide");
      loadDataClass();
      // One.helpers("jq-notify", {
      //   type: "success",
      //   icon: "fa fa-check me-1",
      //   message: "Thêm lớp thành công!",
      // });
    },
  });
});

loadDataClass();
loadDataGroup();

// $(document).on("click", ".btn-update-group", function () {
//   var trid = $(this).attr("dataid");
//   $("#mamon").val(trid);
//   $("#tenmon").val($(this).closest("td").closest("tr").children().eq(1).text());
// });

// $("#edit_class").click(function (e) {
//   $.ajax({
//     type: "post",
//     url: "./subject/update",
//     data: {
//       mamon: $("#mamon").val(),
//       tenmon: $("#tenmon").val(),
//     },
//     success: function (response) {
//       loadData();
//       $("#modal-edit-chapter").modal("hide");
//     },
//   });
// });
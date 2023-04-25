<?php
require_once 'vendor/autoload.php';
require_once 'vendor/phpoffice/phpexcel/Classes/PHPExcel/IOFactory.php';
class Module extends Controller
{
    public $nhomModel;

    function __construct()
    {
        $this->nhomModel = $this->model("NhomModel");
        parent::__construct();
    }

    public function default()
    {
        AuthCore::checkAuthentication();
        if (AuthCore::checkPermission("hocphan", "view")) {
            $this->view("main_layout", [
                "Page" => "module",
                "Title" => "Quản lý nhóm học phần",
                "Script" => "module",
                "Plugin" => [
                    "sweetalert2" => 1,
                    "select" => 1,
                    "jquery-validate" => 1,
                    "notify" => 1
                ]
            ]);
        } else
            $this->view("single_layout", ["Page" => "error/page_403", "Title" => "Lỗi !"]);
    }

    public function detail($manhom)
    {
        AuthCore::checkAuthentication();
        if (AuthCore::checkPermission("hocphan", "view")) {
            $this->view("main_layout", [
                "Page" => "class_detail",
                "Title" => "Quản lý nhóm",
                "Plugin" => [
                    "datepicker" => 1,
                    "flatpickr" => 1,
                    "sweetalert2" => 1,
                ],
                "Script" => "class_detail",
                "Detail" => $this->nhomModel->getDetailGroup($manhom)
            ]);
        } else
            $this->view("single_layout", ["Page" => "error/page_403", "Title" => "Lỗi !"]);
    }

    public function loadData()
    {
        if ($_SERVER['REQUEST_METHOD'] == "POST" && AuthCore::checkPermission("hocphan", "create")) {
            $hienthi = $_POST['hienthi'];
            $user_id = $_SESSION['user_id'];
            $result = $this->nhomModel->getBySubject($user_id, $hienthi);
            echo json_encode($result);
        } else
            echo json_encode(false);
    }

    public function add()
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST" && AuthCore::checkPermission("hocphan", "create")) {
            $tennhom = $_POST['tennhom'];
            $ghichu = $_POST['ghichu'];
            $monhoc = $_POST['monhoc'];
            $namhoc = $_POST['namhoc'];
            $hocky = $_POST['hocky'];
            $giangvien = $_SESSION['user_id'];
            $result = $this->nhomModel->create($tennhom, $ghichu, $namhoc, $hocky, $giangvien, $monhoc);
            echo $result;
        } else
            echo json_encode(false);
    }

    public function delete()
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST" && AuthCore::checkPermission("hocphan", "delete")) {
            $manhom = $_POST['manhom'];
            $result = $this->nhomModel->delete($manhom);
            echo $result;
        } else
            echo json_encode(false);
    }

    public function update()
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST" && AuthCore::checkPermission("hocphan", "update")) {
            $manhom = $_POST['manhom'];
            $tennhom = $_POST['tennhom'];
            $ghichu = $_POST['ghichu'];
            $monhoc = $_POST['monhoc'];
            $namhoc = $_POST['namhoc'];
            $hocky = $_POST['hocky'];
            $result = $this->nhomModel->update($manhom, $tennhom, $ghichu, $namhoc, $hocky, $monhoc);
            echo json_encode($result);
        } else
            echo json_encode(false);
    }

    public function hide()
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST" && AuthCore::checkPermission("hocphan", "create")) {
            $manhom = $_POST['manhom'];
            $giatri = $_POST['giatri'];
            $result = $this->nhomModel->hide($manhom, $giatri);
            echo $result;
        } else
            echo json_encode(false);
    }

    public function getDetail()
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST" && AuthCore::checkPermission("hocphan", "create")) {
            $manhom = $_POST['manhom'];
            $result = $this->nhomModel->getById($manhom);
            echo json_encode($result);
        } else
            echo json_encode(false);
    }


    public function updateInvitedCode()
    {
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            $manhom = $_POST['manhom'];
            $result = $this->nhomModel->updateInvitedCode($manhom);
            echo $result;
        }
    }

    public function getInvitedCode()
    {
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            $manhom = $_POST['manhom'];
            $result = $this->nhomModel->getInvitedCode($manhom);
            echo $result['mamoi'];
        }
    }

    public function getSvList() 
    {
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            $manhom = $_POST['manhom'];
            $result = $this->nhomModel->getSvList($manhom);
            echo json_encode($result);
        }
    }


    public function addSV()
    {
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            $mssv = $_POST['mssv'];
            $hoten = $_POST['hoten'];
            $sdt = $_POST['sdt'];
            $email = $_POST['email'];
            $ngaysinh = $_POST['ngaysinh'];
            $password = $_POST['password'];
            $gioitinh = $_POST['gioitinh'];
            $result = $this->nhomModel->addSV($mssv,$hoten,$sdt,$email,$ngaysinh,$password,$gioitinh);
            echo json_encode($result);
        }
    }
}

?>

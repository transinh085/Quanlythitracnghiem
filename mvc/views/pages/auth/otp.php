<!-- Page Content -->
<div class="bg-image" style="background-image: url('./public/media/photos/photo16@2x.jpg');">
    <div class="row g-0 justify-content-center bg-black-75">
        <div class="hero-static col-sm-8 col-md-6 col-xl-4 d-flex align-items-center p-2 px-sm-0">
            <!-- Reminder Block -->
            <div class="block block-transparent block-rounded w-100 mb-0 overflow-hidden">
                <div class="block-content block-content-full px-lg-5 px-xl-6 py-4 py-md-5 py-lg-6 bg-body-extra-light">
                    <!-- Header -->
                    <div class="mb-2 text-center">
                        <div class="link-fx fw-bold fs-1">
                            <!-- <span class="text-dark">Dash</span> -->
                            <span class="text-primary">OTP</span>
                        </div>
                        <p class="text-uppercase fw-bold fs-sm text-dark">Verification Code</p>
                        <p class="fw-bold fs-sm text-muted">We have sent a verification code to your gmail</p>
                    </div>
                    <!-- END Header -->

                    <!-- Reminder Form -->
                    <!-- jQuery Validation (.js-validation-reminder class is initialized in js/pages/op_auth_reminder.min.js which was auto compiled from _js/pages/op_auth_reminder.js) -->
                    <!-- For more info and examples you can check out https://github.com/jzaefferer/jquery-validation -->
                    <form class="js-validation-reminder" action="" method="">
                        <div class="mb-4">
                            <div class="input-group input-group-lg">
                                <input type="text" class="form-control" id="reminder-credential"
                                    name="reminder-credential" placeholder="Enter confirmation code">
                            </div>
                        </div>
                        <div class="text-center mb-4 add-btn-otp">
                            <button type="submit" class="btn btn-hero btn-primary">
                                verify
                            </button>
                        </div>
                    </form>
                    <input type="hidden" value="" id="email_recover">
                    <!-- END Reminder Form -->
                </div>
            </div>
            <!-- END Reminder Block -->
        </div>
    </div>
</div>
<!-- END Page Content -->
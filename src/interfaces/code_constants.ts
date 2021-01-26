export class CodeConstants {
    public static readonly USER_MODEL: string = "table_user";
    public static readonly RACE_MODEL: string = "table_race";
    public static readonly RACE_INVITATION_CODE_MODEL: string = "table_race_invitation_code";
    public static readonly INVITATION_CODE_MODEL: string = "table_invitation_code";
    public static readonly QUIZ_CHALLENGE_MODEL: string = "table_quiz_challenge";
    public static readonly SPECIAL_CHALLENGE_MODEL: string = "table_special_challenge";
    public static readonly PHYSICAL_CHALLENGE_MODEL: string = "table_physical_challenge";
    public static readonly QUIZ_ANSWERS_MODEL: string = "table_quiz_answers";
    public static readonly SPECIAL_ANSWERS_MODEL: string = "table_special_answers";
    public static readonly PHYSICAL_CHALLENGE_LOCATIONS_MODEL: string = "table_physical_challenge_locations";
    public static readonly PHOTO_CHALLENGE_MODEL: string = "table_photo_challenge";
    public static readonly USER_OTP_MODEL: string = "table_user_otp";
    public static readonly RACE_CHECKPOINT_MODEL: string = "table_race_checkpoints";
    public static readonly USER_RACE_CHECKPOINT_MODEL: string = "table_user_race_checkpoint_history";
    public static readonly USER_RACE_CHECKPOINT_HISTORY_MODEL: string = "table_user_race_checkpoint_history";
    public static readonly AUTH_MODEL: string = "table_auth";
    public static readonly FAQ_MODEL: string = "table_faq";
    public static readonly TERM_MODEL: string = "table_terms_conditions";
    public static readonly ROLE_MODEL: string = "table_role";
    public static readonly RACE_TYPE_MODEL: string = "table_race_type";
    public static readonly RACE_TEAM_MODEL: string = "table_race_teams";
    public static readonly RACE_STATUS_MODEL: string = "table_race_status";
    public static readonly RACE_DISCOUNT: string = "table_race_discount";
    public static readonly CURRENCY: string = "table_currency";
    public static readonly PAYMENT: string = "table_payment";
    public static readonly PAYMENT_TRANSACTION: string = "table_payment_transaction";
    public static readonly CHALLENGE_TYPE_MODEL: string = "table_challenge_type";
    public static readonly USER_RACE_CHALLENGE_HISTORY_MODEL: string = "table_user_race_challenge_history";
    public static readonly BOOKING_TYPE_MODEL: string = "table_booking_type";
    public static readonly INVITE_STATUS_MODEL: string = "table_invite_status";
    public static readonly USER_RACE_STATUS_MODEL: string = "table_user_race_status";
    public static readonly TSHIRT_SIZES_MODEL: string = "table_tshirt_sizes";
    public static readonly CHALLENGE_STATUS_MODEL: string = "table_challenge_status";
    public static readonly BOOKING_MODEL: string = "table_bookings";
    public static readonly BOOKING_INVITATION_MODEL: string = "table_booking_invitation";
    public static readonly RACE_PARTICIPANTS_MODEL: string = "table_race_participants";
    public static readonly RACE_EVENTS_MODEL: string = "table_race_events";
    public static readonly USER_RACE_STATS_MODEL: string = "table_user_race_stats";
    public static readonly INVITAION_CODE_MODEL: string = "table_invitation_codes";
    public static readonly CHECKPOINT_CATEGORY_MODEL: string = "table_checkpoint_category";
    public static readonly RACE_MEDIA_MODEL: string = "table_race_media";
    public static readonly RACE_DISCOUNT_MODEL: string = "table_race_discount";
    public static readonly EMAIL_CONTACT_US_MODEL: string = "table_email_contact_us";
    public static readonly POLICY_MODEL: string = "table_privacy_policy";
    public static readonly ONBOARDING_IMAGES_MODEL: string = "table_onboarding_images";
    public static readonly BCRYPT_KEY: 10;
    public static readonly JWT_KEY: string = "jklkjldsjgfkjghdfjkghfhkfhgf";
    public static readonly JWT_EXPIRY_TIME = "365d";


    public static readonly BOOKING_TYPE_INDIVIDUAL = "Individual";
    public static readonly BOOKING_TYPE_TEAM = "Team";
    public static readonly OTP_SENT: string = "Otp Sent Successfully";
    public static readonly OTP_VALIDATED: string = "Valid Otp";
    public static readonly RESET_PASS_SUCCESS: string = "Reset password successful";
    public static readonly CHANGE_PASS_SUCCESS: string = "Your password has been changed successfully";
    public static readonly OTP_SEND: string = "OTP Send Successfully!";
    public static readonly USER_REGISTERED: string = "User Registered Successfully!";
    public static readonly USER_CREATED: string = "User Created Successfully! Check email for more info";
    public static readonly RACE_REGISTERED: string = "Race Registered Successfully!";
    public static readonly SUCCESSFULLY_UPDATED: string = "Record successfully updated!";
    public static readonly SUCCESSFULLY_BULK_CREATED: string = "Records successfully created!";
    public static readonly USER_LOGOUT: string = "Your account logged out successfully";
    public static readonly BOOKING_CONFIRMED: string = "Congratulations! Your booking has been confirmed";
    public static readonly BOOKING_NOT_FOUND: string = "No booking need for practice";
    public static readonly BOOKING_ACTIVATION: string = "Update booking activation successfully";
    public static readonly USER_ALREADY_REGISTERED: string = "User already registerd for the race.";
    public static readonly RACE_EVENT_NOT_MATCH: string = "Race Event not belong to that Race.";
    public static readonly NO_PARTICIPANTS: string = "No participants found with the ID"
    public static readonly USER_ALREADY_REGISTERED_FOR_THE_RACE: string = "User already registered for the race.";
    public static readonly INVITATION_STATUS: string = "Pending";
    public static readonly USER_RACE_STATUS: string = "Started";
    public static readonly RACE_INACTIVE_STATUS: string = "Inactive";
    public static readonly RACE_ACTIVE_STATUS: string = "Active";
    public static readonly RACE_STARTED: string = "The race is start";
    public static readonly CHECKPOINTS_DATA_UPDATED: string = "Checkpoints data updated";
    public static readonly RACE_STATS_UPDATED: string = "User race stats data updated";
    public static readonly RECORD_UPDATED: string = "The challenge history has been updated";
    public static readonly PRACTICE_RECORD_UPDATED: string = "The practice challenge record has been updated";
    public static readonly NO_CHALLNEGE: string = "No challenge found with the ID";
    public static readonly NO_CHECKPOINT: string = "Checkpoint not belong to this race ID";
    public static readonly CHALLENGE_PHYSICAL: string = "Physical";
    public static readonly CHALLENGE_QUIZ: string = "Quiz";
    public static readonly CHALLENGE_PHOTO: string = "Photo";
    public static readonly CHALLENGE_SPECIAL: string = "Special";
    public static readonly NEW_CHALLENGE_HISTORY: string = "A new challenge record has been added";
    public static readonly NEW_PRACTICE_CHALLENGE_ADDED: string = "A new practice record has been added";
    public static readonly TOTAL_STARPOINTS: string = "sum";
    public static readonly AVG_STARPOINTS: string = "avg";
    public static readonly AVG_TYPE = 0;
    public static readonly MAX_TYPE = 1;
    public static readonly FIRST_ENTRY = 2;
    public static readonly RACE_END: string = "Ended";
    public static readonly RACE_TYPE_PREMIUM: string = "Premium";
    public static readonly RACE_TYPE_PREMIUM_PRAD: string = "Premium Paid";
    public static readonly RACE_TYPE_PRACTICE: string = "Practice";
    public static readonly RACE_LIVE: string = "Live";
    public static readonly RACE_NOT_STARTED: string = "Not Started";
    public static readonly NO_RANK: string = "No record for practice race ID";
    public static readonly CHALLENGE_QUIT: string = "Quit";
    public static readonly CHALLENGE_FAIL: string = "Fail";
    public static readonly CHALLENGE_COMPLETE: string = "Complete";
    public static readonly RACE_COMPLETE: string = "Completed";
    public static readonly RACE_FINISH: string = "Finished";
    public static readonly NEW_RACE_CREATED: string = "A new race has been created Successfully!";
    public static readonly NEW_EVENTS_CRETAED: string = "New events created Successfully!";
    public static readonly NEW_IMAGE: string = "A new image has been uploaded successfully.";
    public static readonly DELETE_RACE: string = "The record has been deleted successfully.";
    public static readonly DELETE_USER_LEADERBOARD: string = "The record has been deleted successfully.";
    public static readonly NEW_ADMIN: string = "A new admin is created successfully.";
    public static readonly DELETE_ADMIN: string = "The Admin record has been deleted successfully";
    public static readonly DELETE_USER: string = "The user record has been deleted successfully";
    public static readonly EMAIL_SENT_TO_ADMIN: string = "The email has been sent to the admin successfully";
    public static readonly NEW_RECORD: string = "A new record has been added";


    public static readonly ROLES: Object = {
        ADMIN: "Admin",
        RUNNER: "Runner",
        SUPER_ADMIN: "Super_Admin"
    };

    public static readonly MEDIA_TYPES: Object = {
        Race_Media: "Race_Media",
        Checkpoints_Icon: "Checkpoints_Icon",
        Checkpoints_Image: "Checkpoints_Image",
        Challenges_Icon: "Challenges_Icon"
    };
}

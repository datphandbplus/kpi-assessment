"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryConstants = void 0;
class QueryConstants {
}
exports.QueryConstants = QueryConstants;
QueryConstants.GetAllRaces = `select
                            r.id as id,
                            r.name as name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            r.price as price,
                            r.featured as featured,
                            r.overview as overview,
                            r.description as description,
                            rt.name as race_type,
                            r.registration_start as registration_start,
                            r.registration_end as registration_end,
                            r.location as location,
                            r.created_at as created_at,
                            r.updated_at as updated_at,
                            r.start_location_lat as start_location_lat,
                            r.start_location_lng as start_location_lng,
                            r.start_location_radius as start_location_radius,
                            r.end_location_lat as end_location_lat,
                            r.end_location_lng as end_location_lng,
                            r.end_location_radius as end_location_radius,
                            r.max_race_participants as max_race_participants,
                            r.min_race_participants as min_race_participants,
                            r.max_team_member as max_team_member,
                            r.min_team_member as min_team_member,
                            trm.url as race_media__url,
                            trm.media_type as race_media__media_type,
                            tcc.name as checkpoints__category_name,
                            tcc.color as checkpoints__color,
                            trc.id as checkpoints__id,
                            trc.name as checkpoints__name,
                            trc.starpoints as checkpoints__starpoints,
                            tre.id as race_events__id,
                            tre.race_id as race_events__race_id,
                            tre.start_date as race_events__start_date,
                            tre.end_date as race_events__end_date,
                            tre.max_event_participants as race_events__max_event_participants,
                            tre.min_event_participants as race_events__min_event_participants,
                            trp.user_id as race_events__user_id
                            from table_race r
                            Left join table_race_type rt on r.race_type = rt.id
                            Left join table_race_checkpoints trc on trc.race_id = r.id
                            Left join table_race_events tre on tre.race_id = r.id
                            Left join table_checkpoint_category tcc on tcc.id = trc.category_id
                            Left Join table_race_participants trp ON tre.id = trp.event_id and tre.race_id=trp.race_id and trp.user_id=`;
QueryConstants.GetRaceByIdUser = `select
                            tst.name as user_status
                            from table_user_race_stats turs
                            left join table_user_race_status tst on turs.status = tst.id
                            where turs.race_id =`;
QueryConstants.GetRaceById = `select
                            r.id as id,
                            r.name as name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            r.price as price,
                            r.featured as featured,
                            r.overview as overview,
                            r.description as description,
                            rt.name as race_type,
                            r.registration_start as registration_start,
                            r.registration_end as registration_end,
                            r.location as location,
                            r.created_at as created_at,
                            r.updated_at as updated_at,
                            r.start_location_lat as start_location_lat,
                            r.start_location_lng as start_location_lng,
                            r.start_location_radius as start_location_radius,
                            r.end_location_lat as end_location_lat,
                            r.end_location_lng as end_location_lng,
                            r.end_location_radius as end_location_radius,
                            r.max_race_participants as max_race_participants,
                            r.min_race_participants as min_race_participants,
                            r.max_team_member as max_team_member,
                            r.min_team_member as min_team_member,
                            r.why_race_section as why_race_section,
                            trm.url as race_media__url,
                            trm.media_type as race_media__media_type,
                            tre.id as race_events__id,
                            tre.race_id as race_events__race_id,
                            tre.start_date as race_events__start_date,
                            trp.user_id as race_events__user_id,
                            tre.end_date as race_events__end_date,
                            tre.max_event_participants as race_events__max_event_participants,
                            tre.min_event_participants as race_events__min_event_participants
                            from table_race r
                            Left join table_race_type rt on r.race_type = rt.id
                            Left join table_race_media trm on trm.race_id = r.id
                            Left join table_race_events tre on tre.race_id = r.id
                            Left Join table_race_participants trp ON tre.id = trp.event_id and tre.race_id = trp.race_id and trp.user_id=`;
QueryConstants.GetAllRacesSignedUp = `SELECT
                            tbt.name
                            FROM table_race_participants trp
                            join table_bookings tb on tb.id = trp.booking_id and tb.activate = 1 and isnull(tb.deleted_at)
                            Left join table_booking_type tbt on tbt.id = tb.type
                            where trp.user_id = `;
QueryConstants.IndividualBookingQuery = `select
                            b.id as id,
                            b.activate as activate,
                            u.name as name,
                            u.email as email,
                            u.mobile as mobile,
                            r.id as race_id,
                            r.name as race_name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            tbt.name as booking_type,
                            te.start_date as race_start_date,
                            b.booking_number as booking_number,
                            tbt.name as participant_type,
                            b.member_count as member_count
                            from table_bookings b
                            Left join table_race r on r.id = b.race_id
                            Left join table_user u on u.id = b.booked_by
                            Left join table_race_events te on te.id = b.race_event_id
                            Left join table_booking_type tbt on tbt.id = b.type
                            where isnull(b.deleted_at) and b.id =`;
QueryConstants.TeamBookingQuery = `select
                            b.id as id,
                            b.activate as activate,
                            r.id as race_id,
                            r.name as race_name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            r.max_race_participants as max_race_participants,
                            r.min_race_participants as min_race_participants,
                            r.max_team_member as max_team_member,
                            r.min_team_member as min_team_member,
                            tbt.name as booking_type,
                            te.start_date as race_start_date,
                            u.name as users__name,
                            u.email as users__email,
                            u.mobile as users__mobile,
                            b.booking_number as booking_number,
                            b.member_count as member_count,
                            tbt.name as participant_type,
                            trt.id as team_id,
                            trt.name as team_name,
                            trt.icon as team_icon,
                            tbi.code as invitations__code
                            from table_bookings b
                            left join table_race r on r.id = b.race_id
                            left join table_user u on u.id = b.booked_by
                            left join table_race_events te on te.id = b.race_event_id
                            left join table_booking_type tbt on tbt.id = b.type
                            left join table_race_teams trt on trt.user_id = b.booked_by and trt.race_id = b.race_id
                            right join table_booking_invitation tbi on tbi.booking_id = b.id and tbi.status = 1
                            where isnull(b.deleted_at) and b.id =`;
QueryConstants.MemberBookingQuery1 = `select
                            b.id as id,
                            b.activate as activate,
                            r.id as race_id,
                            r.name as race_name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            r.max_race_participants as max_race_participants,
                            r.min_race_participants as min_race_participants,
                            r.max_team_member as max_team_member,
                            r.min_team_member as min_team_member,
                            tbt.name as booking_type,
                            te.start_date as race_start_date,
                            u.name as users__name,
                            u.email as users__email,
                            u.mobile as users__mobile,
                            b.booking_number as booking_number,
                            tbt.name as participant_type,
                            b.member_count as member_count,
                            trt.name as team_name,
                            trt.icon as team_icon,
                            tbi.code as invitations__code
                            from table_bookings b
                            left join table_race r on r.id = b.race_id
                            left join table_race_events te on te.id = b.race_event_id
                            left join table_booking_type tbt on tbt.id = b.type
                            left join table_race_teams trt on trt.user_id = b.booked_by and trt.race_id = b.race_id
                            left join table_race_participants trp on trp.booking_id = b.id
                            left join table_user u on u.id = trp.user_id
                            left join table_booking_invitation tbi on tbi.booking_id = b.id and tbi.status = 1
                            where isnull(b.deleted_at) and b.id =`;
QueryConstants.userProfileRaceHistory = `select
                            u.name as user_name,
                            u.profile_image_url as user_pic,
                            u.starpoints as total_starpoints,
                            r.id as race_details__id,
                            r.team_score_type as race_details__team_score_type,
                            r.allow_end_race as race_details__allow_end_race,
                            r.name as race_details__name,
                            trm.url as race_details__race_media__url,
                            trm.media_type as race_details__race_media__media_type,
                            turs.start_date as race_details__race_start_date,
                            turs.starpoints as race_details__race_starpoints
                            from table_user u
                            left join table_user_race_stats turs on turs.user_id = u.id
                            left join table_race r on r.id = turs.race_id
                            Left join table_race_media trm on trm.race_id = r.id
                            where u.id =`;
QueryConstants.getUserRaceDetails = `select
                            t.id as id,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            t.race_id as race_id,
                            t.distance as distance,
                            if(isnull(t.updated_starpoints), t.starpoints, t.updated_starpoints) as starpoints,
                            t.start_date as start_date,
                            t.end_date as end_date,
                            t.image_url as image_url,
                            turs.name as status,
                            tcc.name as checkpoints__category_name,
                            tcc.color as checkpoints__color,
                            trc.id as checkpoints__id,
                            trc.name as checkpoints__name,
                            trc.image as checkpoints__icon,
                            tct.name as checkpoints__challenge_type,
                            trc.starpoints as checkpoints__starpoints,
                            photo.id as photo_challenges__id,
                            photo.checkpoint_id as photo_challenges__checkpoint_id,
                            photo.name as photo_challenges__name,
                            photo.icon as photo_challenges__icon,
                            photo.starpoints as photo_challenges__starpoints,
                            tpc.id as physical_challenges__id,
                            tpc.checkpoint_id as physical_challenges__checkpoint_id,
                            tpc.name as physical_challenges__name,
                            tpc.icon as physical_challenges__icon,
                            tpc.starpoints as physical_challenges__starpoints,
                            tqc.id as quiz_challenges__id,
                            tqc.checkpoint_id as quiz_challenges__checkpoint_id,
                            tqc.name as quiz_challenges__name,
                            tqc.icon as quiz_challenges__icon,
                            tqc.starpoints as quiz_challenges__starpoints,
                            tspc.id as special_challenges__id,
                            tspc.checkpoint_id as special_challenges__checkpoint_id,
                            tspc.name as special_challenges__name,
                            tspc.icon as special_challenges__icon,
                            tspc.starpoints as special_challenges__starpoints
                            from table_user_race_stats t
                            Left join table_race r on r.id = t.race_id
                            Left join table_race_checkpoints trc on trc.race_id = r.id
                            Left join table_challenge_type tct on tct.id = trc.challenge_type
                            Left join table_photo_challenge photo on photo.checkpoint_id = trc.id
                            Left join table_physical_challenge tpc on tpc.checkpoint_id = trc.id
                            Left join table_quiz_challenge tqc on tqc.checkpoint_id = trc.id
                            Left join table_special_challenge tspc on tspc.checkpoint_id = trc.id
                            Left join table_checkpoint_category tcc on tcc.id = trc.category_id
                            Left join table_user_race_status turs on turs.id = t.status`;
QueryConstants.checkpointStatus = `select
                            t.id as id,
                            t.race_id as race_id,
                            t.distance as distance,
                            if(isnull(t.updated_starpoints), t.starpoints, t.updated_starpoints) as starpoints,
                            tcc.name as checkpoints__category_name,
                            tcc.color as checkpoints__color,
                            trc.id as checkpoints__id
                            from table_user_race_stats t
                            Left join table_race r on r.id = t.race_id
                            Left join table_race_checkpoints trc on trc.race_id = r.id
                            Left join table_checkpoint_category tcc on tcc.id = trc.category_id
                            Left join table_user_race_status turs on turs.id = t.status
                            where t.id =`;
QueryConstants.userStatsStarpoints = `select
                            t.id as id,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            t.race_id as race_id,
                            t.distance as distance,
                            if(isnull(t.updated_starpoints), t.starpoints, t.updated_starpoints) as starpoints,
                            tcc.name as physical_challenges__category_name,
                            tcc.color as physical_challenges__color,
                            photo.id as photo_challenges__id,
                            photo.checkpoint_id as photo_challenges__checkpoint_id,
                            photo.name as photo_challenges__name,
                            photo.icon as photo_challenges__icon,
                            photo.starpoints as photo_challenges__starpoints,
                            tpc.id as physical_challenges__id,
                            tpc.checkpoint_id as physical_challenges__checkpoint_id,
                            tpc.name as physical_challenges__name,
                            tpc.icon as physical_challenges__icon,
                            tpc.starpoints as physical_challenges__starpoints,
                            tpc.id as physical_challenges__id,
                            tpc.checkpoint_id as physical_challenges__checkpoint_id,
                            tpc.name as physical_challenges__name,
                            tpc.icon as physical_challenges__icon,
                            tpc.starpoints as physical_challenges__starpoints,
                            tcc.name as quiz_challenges__category_name,
                            tcc.color as quiz_challenges__color,
                            tqc.id as quiz_challenges__id,
                            tqc.checkpoint_id as quiz_challenges__checkpoint_id,
                            tqc.name as quiz_challenges__name,
                            tqc.icon as quiz_challenges__icon,
                            tqc.starpoints as quiz_challenges__starpoints,
                            tspc.id as special_challenges__id,
                            tspc.checkpoint_id as special_challenges__checkpoint_id,
                            tspc.name as special_challenges__name,
                            tspc.icon as special_challenges__icon,
                            tspc.starpoints as special_challenges__starpoints
                            from table_user_race_stats t
                            Left join table_race r on r.id = t.race_id
                            Left join table_race_checkpoints trc on trc.race_id = r.id
                            Left join table_photo_challenge photo on photo.checkpoint_id = trc.id
                            Left join table_physical_challenge tpc on tpc.checkpoint_id = trc.id
                            Left join table_quiz_challenge tqc on tqc.checkpoint_id = trc.id
                            Left join table_special_challenge tspc on tspc.checkpoint_id = trc.id
                            Left join table_checkpoint_category tcc on tcc.id = trc.category_id
                            Left join table_user_race_status turs on turs.id = t.status
                            where t.id =`;
QueryConstants.getTeamleaderboard_FirsEntry = `
                            SELECT result.race_id,
                                   result.team_id,
                                   result.name,
                                   round(avg(result.starpoints)) AS starpoints,
                                   result.icon
                            FROM
                              (SELECT turs.race_id,
                                      trp.team_id,
                                      trt.name AS name,
                                      sum(turs.starpoints) AS starpoints,
                                      trt.icon AS icon,
                                      turs.user_id AS user_id
                               FROM (
                                 SELECT h.race_id,
                                        h.checkpoint_id,
                                        h.starpoints,
                                        h.user_id,
                                        MIN(h.complete_date)
                                 FROM
                                    table_user_race_checkpoint_history AS h
                                 WHERE
                                    EXISTS( (SELECT 
                                            *
                                        FROM
                                            ((SELECT 
                                            race_id, user_id, checkpoint_id, starpoints
                                        FROM
                                            table_user_race_checkpoint_history
                                        GROUP BY user_id , race_id , checkpoint_id , starpoints) UNION ALL (SELECT 
                                            race_id,
                                                user_id,
                                                CASE
                                                    WHEN
                                                        physical_challenge_id IS NOT NULL
                                                    THEN
                                                        (SELECT 
                                                                checkpoint_id
                                                            FROM
                                                                table_physical_challenge AS p
                                                            WHERE
                                                                p.id = physical_challenge_id)
                                                    WHEN
                                                        quiz_challenge_id IS NOT NULL
                                                    THEN
                                                        (SELECT 
                                                                checkpoint_id
                                                            FROM
                                                                table_quiz_challenge AS p
                                                            WHERE
                                                                p.id = quiz_challenge_id)
                                                    ELSE (SELECT 
                                                            checkpoint_id
                                                        FROM
                                                            table_special_challenge AS p
                                                        WHERE
                                                            p.id = special_challenge_id)
                                                END AS checkpoint_id,
                                                starpoints
                                        FROM
                                            table_user_race_challenge_history
                                        GROUP BY user_id , race_id , checkpoint_id , starpoints)) AS t))
                                 GROUP BY h.race_id, h.user_id , h.checkpoint_id , h.starpoints
                               ) AS turs
                               INNER JOIN table_race_participants trp ON turs.user_id = trp.user_id
                               AND turs.race_id=trp.race_id
                               JOIN table_race_teams trt ON trt.id=trp.team_id
                               INNER JOIN table_race_checkpoints AS ckp ON ckp.id = turs.checkpoint_id
                               GROUP BY user_id,
                                        turs.race_id,
                                        trp.team_id,
                                        trt.name) AS result
                            WHERE race_id=`;
QueryConstants.getTeamleaderboard_Avg = `
                            SELECT result.race_id,
                                   result.team_id,
                                   result.name,
                                   round(sum(result.starpoints)) AS starpoints,
                                   result.icon
                            FROM
                              (SELECT turs.race_id,
                                      trp.team_id,
                                      trt.name AS name,
                                      max(turs.starpoints) AS starpoints,
                                      trt.icon AS icon,
                                      ckp.id AS checkpoint_id
                               FROM
                                 (SELECT DISTINCT race_id,
                                                  user_id,
                                                  checkpoint_id,
                                                  sum(starpoints) AS starpoints
                                  FROM(
                                         (SELECT race_id,
                                                 user_id,
                                                 checkpoint_id,
                                                 starpoints
                                          FROM table_user_race_checkpoint_history
                                          GROUP BY user_id,
                                                   race_id,
                                                   checkpoint_id,
                                                   starpoints)
                                       UNION ALL
                                         (SELECT race_id,
                                                 user_id,
                                                 CASE
                                                     WHEN physical_challenge_id IS NOT NULL THEN
                                                            (SELECT checkpoint_id
                                                             FROM table_physical_challenge AS p
                                                             WHERE p.id = physical_challenge_id)
                                                     WHEN quiz_challenge_id IS NOT NULL THEN
                                                            (SELECT checkpoint_id
                                                             FROM table_quiz_challenge AS p
                                                             WHERE p.id = quiz_challenge_id)
                                                     ELSE
                                                            (SELECT checkpoint_id
                                                             FROM table_special_challenge AS p
                                                             WHERE p.id = special_challenge_id)
                                                 END AS checkpoint_id,
                                                 starpoints
                                          FROM table_user_race_challenge_history
                                          GROUP BY user_id,
                                                   race_id,
                                                   checkpoint_id,
                                                   starpoints)) AS t
                                  GROUP BY user_id,
                                           race_id,
                                           checkpoint_id) AS turs
                               INNER JOIN table_race_participants trp ON turs.user_id = trp.user_id
                               AND turs.race_id=trp.race_id
                               JOIN table_race_teams trt ON trt.id=trp.team_id
                               INNER JOIN table_race_checkpoints AS ckp ON ckp.id = turs.checkpoint_id
                               GROUP BY checkpoint_id,
                                        turs.race_id,
                                        trp.team_id,
                                        trt.name
                               ORDER BY checkpoint_id) AS result
                            WHERE race_id=`;
QueryConstants.getTeamleaderboard_Max = `
                            SELECT result.race_id,
                                   result.team_id,
                                   result.name,
                                   round(sum(result.starpoints)) AS starpoints,
                                   result.icon
                            FROM
                              (SELECT turs.race_id,
                                      trp.team_id,
                                      trt.name AS name,
                                      max(turs.starpoints) AS starpoints,
                                      trt.icon AS icon,
                                      ckp.id AS checkpoint_id
                               FROM
                                 (SELECT DISTINCT race_id,
                                                  user_id,
                                                  checkpoint_id,
                                                  sum(starpoints) AS starpoints
                                  FROM(
                                         (SELECT race_id,
                                                 user_id,
                                                 checkpoint_id,
                                                 starpoints
                                          FROM table_user_race_checkpoint_history
                                          GROUP BY user_id,
                                                   race_id,
                                                   checkpoint_id,
                                                   starpoints)
                                       UNION ALL
                                         (SELECT race_id,
                                                 user_id,
                                                 CASE
                                                     WHEN physical_challenge_id IS NOT NULL THEN
                                                            (SELECT checkpoint_id
                                                             FROM table_physical_challenge AS p
                                                             WHERE p.id = physical_challenge_id)
                                                     WHEN quiz_challenge_id IS NOT NULL THEN
                                                            (SELECT checkpoint_id
                                                             FROM table_quiz_challenge AS p
                                                             WHERE p.id = quiz_challenge_id)
                                                     ELSE
                                                            (SELECT checkpoint_id
                                                             FROM table_special_challenge AS p
                                                             WHERE p.id = special_challenge_id)
                                                 END AS checkpoint_id,
                                                 starpoints
                                          FROM table_user_race_challenge_history
                                          GROUP BY user_id,
                                                   race_id,
                                                   checkpoint_id,
                                                   starpoints)) AS t
                                  GROUP BY user_id,
                                           race_id,
                                           checkpoint_id) AS turs
                               INNER JOIN table_race_participants trp ON turs.user_id = trp.user_id
                               AND turs.race_id=trp.race_id
                               JOIN table_race_teams trt ON trt.id=trp.team_id
                               INNER JOIN table_race_checkpoints AS ckp ON ckp.id = turs.checkpoint_id
                               GROUP BY checkpoint_id,
                                        turs.race_id,
                                        trp.team_id,
                                        trt.name
                               ORDER BY checkpoint_id) AS result
                            WHERE race_id=`;
QueryConstants.getTeamleaderboard_Sum = `select
                            avg(turs.end_date-start_date) as time_difference,
                            sum(if(isnull(turs.updated_starpoints), turs.starpoints, turs.updated_starpoints)) as starpoints,
                            trp.team_id, trt.name, trt.icon
                            from table_user_race_stats turs
                            join table_race_participants trp ON turs.user_id = trp.user_id AND turs.race_id=trp.race_id
                            join table_race_teams trt ON trt.id=trp.team_id
                            where turs.race_id =`;
QueryConstants.getAllUsersLeaderboard = `select
                            FLOOR(sum(rst.starpoints)) as starpoints,
                            rst.user_id, rst.email,
                            rst.profile_image, rst.created_at, rst.updated_at,
                            rst.name as name
                            from (
                            select
                            max(if(isnull(t.updated_starpoints), t.starpoints, t.updated_starpoints)) AS starpoints,
                            u.profile_image_url as profile_image, u.email,
                            u.name as name, t.user_id, u.updated_at as updated_at, u.created_at as created_at,
                            t.race_id 
                            from table_user_race_stats t
                            Left join table_user u on t.user_id = u.id
                            Left join table_race r on r.id = t.race_id
                            left join table_race_type trt on trt.id = r.race_type
                            group by t.race_id , u.profile_image_url,
                            u.email, u.name, t.user_id, u.updated_at
                            ) rst 
                            where rst.name like case when $search is not null and $search <> '' then concat('%',$search,'%') else rst.name end
                                  or rst.email like case when $search is not null and $search <> '' then concat('%',$search,'%') else rst.email end
                            group by rst.updated_at, rst.created_at, rst.user_id, rst.email order by starpoints desc`;
QueryConstants.getGivenUserLeaderboard = `select
                            FLOOR(sum(rst.starpoints)) as starpoints,
                            rst.user_id, rst.email,
                            rst.profile_image, rst.created_at, rst.updated_at,
                            rst.name as name
                            from (
                            select
                            max(if(isnull(t.updated_starpoints), t.starpoints, t.updated_starpoints)) AS starpoints,
                            u.profile_image_url as profile_image, u.email,
                            u.name as name, t.user_id, u.updated_at as updated_at, u.created_at as created_at,
                            t.race_id 
                            from table_user_race_stats t
                            Left join table_user u on t.user_id = u.id
                            Left join table_race r on r.id = t.race_id
                            left join table_race_type trt on trt.id = r.race_type
                            group by t.race_id , u.profile_image_url,
                            u.email, u.name, t.user_id, u.updated_at
                            ) rst 
                            where rst.user_id = $user_id
                            group by rst.updated_at, rst.created_at, rst.user_id, rst.email order by starpoints desc`;
QueryConstants.getLeaderboard = `
                            select 
                                t.user_id, t.email,
                                t.profile_image,
                                t.name, t.created_at, t.updated_at,
                                t.participant_type,
                                FLOOR(if(isnull(t.updated_starpoints), t.starpoints, t.updated_starpoints)) as starpoints 
                            from (select
                                u.id as user_id, u.email,
                                u.profile_image_url as profile_image,
                                u.name as name, u.created_at as created_at, u.updated_at as updated_at,
                                tb.type as participant_type,
                                max(t.starpoints) as starpoints, max(t.updated_starpoints) as updated_starpoints
                                from table_user_race_stats t
                                Left join table_user u on u.id = t.user_id
                                Left join table_race tr on tr.id = t.race_id
                                Left join table_bookings tb on tb.race_id = t.race_id and tb.booked_by = t.user_id and tb.activate = 1 and isnull(tb.deleted_at)
                                where t.race_id = $race_id and (t.starpoints != 0 OR t.status = 1) 
                                and (u.name like case when $search is not null and $search <> '' then concat('%',$search,'%') else u.name end
                                  or u.email like case when $search is not null and $search <> '' then concat('%',$search,'%') else u.email end)
                                and ((tb.type = $booking_type and tr.race_type != $race_type) or tr.race_type = $race_type)
                                GROUP BY u.id, u.email, u.profile_image_url, u.name, tb.type, u.created_at, u.updated_at) t
                            order by starpoints desc`;
QueryConstants.getLeaderboardDateCondition = `
                            select 
                                t.user_id, t.email,
                                t.profile_image,
                                t.name, t.created_at, t.updated_at,
                                t.participant_type,
                                FLOOR(if(isnull(t.updated_starpoints), t.starpoints, t.updated_starpoints)) as starpoints 
                             from (select
                                u.id as user_id, u.email,
                                u.profile_image_url as profile_image,
                                u.name as name, u.created_at as created_at, u.updated_at as updated_at,
                                tb.type as participant_type,
                                max(t.starpoints) as starpoints, max(t.updated_starpoints) as updated_starpoints
                                from table_user_race_stats t
                                Left join table_user u on u.id = t.user_id
                                Left join table_race tr on tr.id = t.race_id
                                Left join table_bookings tb on tb.race_id = t.race_id and tb.booked_by = t.user_id and tb.activate = 1 and isnull(tb.deleted_at)
                                where month(tr.updated_at) = $month and year(tr.updated_at) = $year
                                and (u.name like case when $search is not null and $search <> '' then concat('%',$search,'%') else u.name end
                                  or u.email like case when $search is not null and $search <> '' then concat('%',$search,'%') else u.email end)
                                and t.race_id = $race_id and (t.starpoints != 0 OR t.status = 1) 
                                and ((tb.type = $booking_type and tr.race_type != $race_type) or tr.race_type = $race_type)
                                GROUP BY u.id, u.email, u.profile_image_url, u.name, tb.type, u.created_at, u.updated_at) t
                            order by t.starpoints desc`;
QueryConstants.getUsersRank_Team = `select
                            trt.id as team_id,
                            trt.name as team_name,
                            avg(turs.end_date-start_date) as time_difference,
                            FLOOR(sum(if(isnull(turs.updated_starpoints), turs.starpoints, turs.updated_starpoints))) as starpoints
                            from table_user_race_stats turs
                            join table_race_participants trp ON turs.user_id = trp.user_id AND turs.race_id=trp.race_id
                            join table_race_teams trt ON trt.id=trp.team_id
                            where turs.race_id =`;
QueryConstants.getUsersRank_Individual = `select
                            u.id as user_id,
                            u.name as name,
                            FLOOR(if(isnull(t.updated_starpoints), max(t.starpoints), max(t.updated_starpoints))) as starpoints,
                            t.end_date-start_date as time_difference
                            from table_user_race_stats t
                            Left join table_user u on u.id = t.user_id
                            where t.race_id = `;
QueryConstants.getChallenges_physical = `select
                            tqc.id as id,
                            tqc.checkpoint_id as checkpoint_id,
                            tqc.name as name,
                            tqc.icon as icon,
                            tqc.question as question,
                            tqc.starpoints as starpoints,
                            tqc.created_at as created_at,
                            tqc.updated_at as updated_at,
                            tqa.id as quiz_options__id,
                            tqa.answer as quiz_options__answer,
                            tqa.is_correct as quiz_options__is_correct
                            from table_quiz_challenge tqc
                            left join table_quiz_answers tqa on tqa.quiz_id = tqc.id
                            where tqc.id In`;
QueryConstants.getChallenges_quiz = `select
                            tpc.id as id,
                            tpc.checkpoint_id as checkpoint_id,
                            tpc.name as name,
                            tpc.icon as icon,
                            tpc.starpoints as starpoints,
                            tpc.duration_minutes as duration,
                            tpc.duration_minutes as duration_minutes,
                            tpc.duration_seconds as duration_seconds,
                            tpc.created_at as created_at,
                            tpc.updated_at as updated_at,
                            tpcl.lat as challenge_locations__lat,
                            tpcl.lng as challenge_locations__lng
                            from table_physical_challenge tpc
                            left join table_physical_challenge_locations tpcl on tpcl.physical_challenge_id = tpc.id
                            where tpc.id In `;
QueryConstants.getChallenges_special = `select
                            tspc.id as id,
                            tspc.checkpoint_id as checkpoint_id,
                            tspc.name as name,
                            tspc.icon as icon,
                            tspc.question as question,
                            tspc.starpoints as starpoints,
                            tspc.created_at as created_at,
                            tspc.updated_at as updated_at,
                            tspa.id as special_options__id,
                            tspa.answer as special_options__answer
                            from table_special_challenge tspc
                            left join table_special_answers tspa on tspa.special_id = tspc.id
                            where tspc.id In`;
QueryConstants.getAdminAllPremiumRaces = `select
                            r.id as id,
                            r.name as name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            r.registration_start as registration_start,
                            r.registration_end as registration_end,
                            r.location as location,
                            tre.id as race_events__id,
                            tre.race_id as race_events__race_id,
                            tre.start_date as race_events__start_date,
                            tre.end_date as race_events__end_date,
                            tre.max_event_participants as race_events__max_event_participants,
                            tre.min_event_participants as race_events__min_event_participants,
                            rt.name as race_type
                            from table_race r
                            Left join table_race_type rt on r.race_type = rt.id
                            Left join table_race_events tre on tre.race_id = r.id
                            where rt.name = "Premium"`;
QueryConstants.getAdminAllPremiumPaidRaces = `select
                            r.id as id,
                            r.name as name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            r.registration_start as registration_start,
                            r.registration_end as registration_end,
                            r.location as location,
                            tdc.id as race_discounts__id,
                            tdc.name as race_discounts__name,
                            tdc.description as race_discounts__description,
                            tdc.code as race_discounts__code,
                            tdc.amount as race_discounts__amount,
                            tdc.type as race_discounts__type,
                            tdc.expired_time as race_discounts__expired_time,
                            tre.id as race_events__id,
                            tre.race_id as race_events__race_id,
                            tre.start_date as race_events__start_date,
                            tre.end_date as race_events__end_date,
                            tre.max_event_participants as race_events__max_event_participants,
                            tre.min_event_participants as race_events__min_event_participants,
                            rt.name as race_type
                            from table_race r
                            Left join table_race_type rt on r.race_type = rt.id
                            Left join table_race_events tre on tre.race_id = r.id
                            left join table_race_discount tdc on tdc.race_id = r.id
                            where rt.name = "Premium Paid"`;
QueryConstants.getAdminAllPracticeRaces = `select
                            r.id as id,
                            r.name as name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            r.registration_start as registration_start,
                            r.registration_end as registration_end,
                            r.location as location,
                            rt.name as race_type
                            from table_race r
                            Left join table_race_type rt on r.race_type = rt.id
                            where rt.name = "Practice"`;
QueryConstants.GetRaceCheckpoints = `select
                            trc.race_id as race_id,
                            trc.id as id, trc.name as name,
                            trc.icon as icon, trc.image as image, trc.lat as lat,
                            trc.lng as lng,
                            trc.starpoints as starpoints,
                            trc.created_at as created_at,
                            trc.updated_at as updated_at,
                            trc.message as message,
                            tcc.name as category_name,
                            tcc.color as color,
                            tct.name as challenge_type
                            from table_race_checkpoints trc
                            Left join table_checkpoint_category tcc on tcc.id = trc.category_id
                            Left join table_challenge_type tct on tct.id = challenge_type where trc.race_id =`;
QueryConstants.getSinglePremiumRaceDetails = `select
                            r.id as id,
                            r.name as name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            r.price as price,
                            r.featured as featured,
                            r.overview as overview,
                            r.description as description,
                            rt.name as race_type,
                            r.registration_start as registration_start,
                            r.registration_end as registration_end,
                            r.location as location,
                            r.why_race_section as why_race_section,
                            r.start_location_lat as start_location_lat,
                            r.start_location_lng as start_location_lng,
                            r.start_location_radius as start_location_radius,
                            r.end_location_lat as end_location_lat,
                            r.end_location_lng as end_location_lng,
                            r.end_location_radius as end_location_radius,
                            r.max_race_participants as max_race_participants,
                            r.min_race_participants as min_race_participants,
                            r.max_team_member as max_team_member,
                            r.min_team_member as min_team_member,
                            r.is_finalize as is_finalize,
                            trm.id as race_media__id,
                            trm.url as race_media__url,
                            trm.media_type as race_media__media_type,
                            trc.id as checkpoints__id,
                            trc.name as checkpoints__name,
                            trc.icon as checkpoints__icon,
                            trc.image as checkpoints__image,
                            trc.lat as checkpoints__lat,
                            trc.lng as checkpoints__lng,
                            trc.starpoints as checkpoints__starpoints,
                            trc.message as checkpoints__message,
                            tcc.name as checkpoints__category_name,
                            tcc.color as checkpoints__color,
                            tct.name as checkpoints__challenge_type,
                            photo.id as checkpoints__photo_challenges__id,
                            photo.name as checkpoints__photo_challenges__name,
                            photo.icon as checkpoints__photo_challenges__icon,
                            photo.starpoints as checkpoints__photo_challenges__starpoints,
                            tpc.id as checkpoints__physical_challenges__id,
                            tpc.name as checkpoints__physical_challenges__name,
                            tpc.icon as checkpoints__physical_challenges__icon,
                            tpc.starpoints as checkpoints__physical_challenges__starpoints,
                            tpc.duration_minutes as checkpoints__physical_challenges__duration,
                            tpc.duration_minutes as checkpoints__physical_challenges__duration_minutes,
                            tpc.duration_seconds as checkpoints__physical_challenges__duration_seconds,
                            tpcl.id as checkpoints__physical_challenges__locations__id,
                            tpcl.lat as checkpoints__physical_challenges__locations__lat,
                            tpcl.lng as checkpoints__physical_challenges__locations__lng,
                            tqc.id as checkpoints__quiz_challenges__id,
                            tqc.name as checkpoints__quiz_challenges__name,
                            tqc.icon as checkpoints__quiz_challenges__icon,
                            tqc.starpoints as checkpoints__quiz_challenges__starpoints,
                            tqc.question as checkpoints__quiz_challenges__question,
                            tqa.id as checkpoints__quiz_challenges__options__id,
                            tqa.answer as checkpoints__quiz_challenges__options__answer,
                            tqa.is_correct as checkpoints__quiz_challenges__options__is_correct,
                            tspc.id as checkpoints__special_challenges__id,
                            tspc.name as checkpoints__special_challenges__name,
                            tspc.icon as checkpoints__special_challenges__icon,
                            tspc.starpoints as checkpoints__special_challenges__starpoints,
                            tspc.question as checkpoints__special_challenges__question,
                            tspa.id as checkpoints__special_challenges__options__id,
                            tspa.answer as checkpoints__special_challenges__options__answer,
                            tre.id as race_events__id,
                            tre.race_id as race_events__race_id,
                            tre.start_date as race_events__start_date,
                            tre.end_date as race_events__end_date,
                            tre.max_event_participants as race_events__max_event_participants,
                            tre.min_event_participants as race_events__min_event_participants
                            from table_race r
                            Left join table_race_type rt on r.race_type = rt.id
                            left join table_race_media trm on trm.race_id = r.id
                            Left join table_race_checkpoints trc on trc.race_id = r.id
                            Left join table_race_events tre on tre.race_id = r.id
                            Left join table_photo_challenge photo on photo.checkpoint_id = trc.id
                            Left join table_physical_challenge tpc on tpc.checkpoint_id = trc.id
                            Left join table_quiz_challenge tqc on tqc.checkpoint_id = trc.id
                            Left join table_special_challenge tspc on tspc.checkpoint_id = trc.id
                            Left join table_challenge_type tct on tct.id = trc.challenge_type
                            Left join table_checkpoint_category tcc on tcc.id = trc.category_id
                            Left join table_physical_challenge_locations tpcl on tpcl.physical_challenge_id = tpc.id
                            Left join table_quiz_answers tqa on tqa.quiz_id = tqc.id
                            Left join table_special_answers tspa on tspa.special_id = tspc.id
                            where r.id =`;
QueryConstants.getSinglePremiumPaidRaceDetails = `select
                            r.id as id,
                            r.name as name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            r.price as price,
                            r.featured as featured,
                            r.overview as overview,
                            r.description as description,
                            rt.name as race_type,
                            r.registration_start as registration_start,
                            r.registration_end as registration_end,
                            r.location as location,
                            r.why_race_section as why_race_section,
                            r.start_location_lat as start_location_lat,
                            r.start_location_lng as start_location_lng,
                            r.start_location_radius as start_location_radius,
                            r.end_location_lat as end_location_lat,
                            r.end_location_lng as end_location_lng,
                            r.end_location_radius as end_location_radius,
                            r.max_race_participants as max_race_participants,
                            r.min_race_participants as min_race_participants,
                            r.max_team_member as max_team_member,
                            r.min_team_member as min_team_member,
                            r.is_finalize as is_finalize,                            
                            tdc.id as race_discounts__id,
                            tdc.name as race_discounts__name,
                            tdc.description as race_discounts__description,
                            tdc.code as race_discounts__code,
                            tdc.amount as race_discounts__amount,
                            tdc.type as race_discounts__type,
                            tdc.expired_time as race_discounts__expired_time,
                            trm.id as race_media__id,
                            trm.url as race_media__url,
                            trm.media_type as race_media__media_type,
                            trc.id as checkpoints__id,
                            trc.name as checkpoints__name,
                            trc.icon as checkpoints__icon,
                            trc.image as checkpoints__image,
                            trc.lat as checkpoints__lat,
                            trc.lng as checkpoints__lng,
                            trc.starpoints as checkpoints__starpoints,
                            trc.message as checkpoints__message,
                            tcc.name as checkpoints__category_name,
                            tcc.color as checkpoints__color,
                            tct.name as checkpoints__challenge_type,
                            photo.id as checkpoints__photo_challenges__id,
                            photo.name as checkpoints__photo_challenges__name,
                            photo.icon as checkpoints__photo_challenges__icon,
                            photo.starpoints as checkpoints__photo_challenges__starpoints,
                            tpc.id as checkpoints__physical_challenges__id,
                            tpc.name as checkpoints__physical_challenges__name,
                            tpc.icon as checkpoints__physical_challenges__icon,
                            tpc.starpoints as checkpoints__physical_challenges__starpoints,
                            tpc.duration_minutes as checkpoints__physical_challenges__duration,
                            tpc.duration_minutes as checkpoints__physical_challenges__duration_minutes,
                            tpc.duration_seconds as checkpoints__physical_challenges__duration_seconds,
                            tpcl.id as checkpoints__physical_challenges__locations__id,
                            tpcl.lat as checkpoints__physical_challenges__locations__lat,
                            tpcl.lng as checkpoints__physical_challenges__locations__lng,
                            tqc.id as checkpoints__quiz_challenges__id,
                            tqc.name as checkpoints__quiz_challenges__name,
                            tqc.icon as checkpoints__quiz_challenges__icon,
                            tqc.starpoints as checkpoints__quiz_challenges__starpoints,
                            tqc.question as checkpoints__quiz_challenges__question,
                            tqa.id as checkpoints__quiz_challenges__options__id,
                            tqa.answer as checkpoints__quiz_challenges__options__answer,
                            tqa.is_correct as checkpoints__quiz_challenges__options__is_correct,
                            tspc.id as checkpoints__special_challenges__id,
                            tspc.name as checkpoints__special_challenges__name,
                            tspc.icon as checkpoints__special_challenges__icon,
                            tspc.starpoints as checkpoints__special_challenges__starpoints,
                            tspc.question as checkpoints__special_challenges__question,
                            tspa.id as checkpoints__special_challenges__options__id,
                            tspa.answer as checkpoints__special_challenges__options__answer,
                            tre.id as race_events__id,
                            tre.race_id as race_events__race_id,
                            tre.start_date as race_events__start_date,
                            tre.end_date as race_events__end_date,
                            tre.max_event_participants as race_events__max_event_participants,
                            tre.min_event_participants as race_events__min_event_participants
                            from table_race r
                            Left join table_race_type rt on r.race_type = rt.id
                            left join table_race_media trm on trm.race_id = r.id
                            left join table_race_discount tdc on tdc.race_id = r.id
                            Left join table_race_checkpoints trc on trc.race_id = r.id
                            Left join table_race_events tre on tre.race_id = r.id
                            Left join table_photo_challenge photo on photo.checkpoint_id = trc.id
                            Left join table_physical_challenge tpc on tpc.checkpoint_id = trc.id
                            Left join table_quiz_challenge tqc on tqc.checkpoint_id = trc.id
                            Left join table_special_challenge tspc on tspc.checkpoint_id = trc.id
                            Left join table_challenge_type tct on tct.id = trc.challenge_type
                            Left join table_checkpoint_category tcc on tcc.id = trc.category_id
                            Left join table_physical_challenge_locations tpcl on tpcl.physical_challenge_id = tpc.id
                            Left join table_quiz_answers tqa on tqa.quiz_id = tqc.id
                            Left join table_special_answers tspa on tspa.special_id = tspc.id
                            where r.id =`;
QueryConstants.getSinglePracticeRaceDetails = `select
                            r.id as id,
                            r.name as name,
                            r.price as price,
                            r.featured as featured,
                            r.overview as overview,
                            r.description as description,
                            rt.name as race_type,
                            r.registration_start as registration_start,
                            r.registration_end as registration_end,
                            r.location as location,
                            r.why_race_section as why_race_section,
                            r.start_location_lat as start_location_lat,
                            r.start_location_lng as start_location_lng,
                            r.start_location_radius as start_location_radius,
                            r.end_location_lat as end_location_lat,
                            r.end_location_lng as end_location_lng,
                            r.end_location_radius as end_location_radius,
                            r.max_race_participants as max_race_participants,
                            r.min_race_participants as min_race_participants,
                            r.max_team_member as max_team_member,
                            r.min_team_member as min_team_member,
                            r.is_finalize as is_finalize,
                            trm.id as race_media__id,
                            trm.url as race_media__url,
                            trm.media_type as race_media__media_type,
                            trc.id as checkpoints__id,
                            trc.name as checkpoints__name,
                            trc.icon as checkpoints__icon,
                            trc.image as checkpoints__image,
                            trc.lat as checkpoints__lat,
                            trc.lng as checkpoints__lng,
                            trc.starpoints as checkpoints__starpoints,
                            trc.message as checkpoints__message,
                            tcc.name as checkpoints__category_name,
                            tcc.color as checkpoints__color,
                            tct.name as checkpoints__challenge_type,

                            photo.id as checkpoints__photo_challenges__id,
                            photo.name as checkpoints__photo_challenges__name,
                            photo.icon as checkpoints__photo_challenges__icon,
                            photo.starpoints as checkpoints__photo_challenges__starpoints,
                            tpc.id as checkpoints__physical_challenges__id,
                            tpc.name as checkpoints__physical_challenges__name,
                            tpc.icon as checkpoints__physical_challenges__icon,
                            tpc.starpoints as checkpoints__physical_challenges__starpoints,
                            tpc.duration_minutes as checkpoints__physical_challenges__duration,
                            tpc.duration_minutes as checkpoints__physical_challenges__duration_minutes,
                            tpc.duration_seconds as checkpoints__physical_challenges__duration_seconds,
                            tpcl.id as checkpoints__physical_challenges__locations__id,
                            tpcl.lat as checkpoints__physical_challenges__locations__lat,
                            tpcl.lng as checkpoints__physical_challenges__locations__lng,
                            tqc.id as checkpoints__quiz_challenges__id,
                            tqc.name as checkpoints__quiz_challenges__name,
                            tqc.icon as checkpoints__quiz_challenges__icon,
                            tqc.starpoints as checkpoints__quiz_challenges__starpoints,
                            tqc.question as checkpoints__quiz_challenges__question,
                            tqa.id as checkpoints__quiz_challenges__options__id,
                            tqa.answer as checkpoints__quiz_challenges__options__answer,
                            tqa.is_correct as checkpoints__quiz_challenges__options__is_correct,
                            tspc.id as checkpoints__special_challenges__id,
                            tspc.name as checkpoints__special_challenges__name,
                            tspc.icon as checkpoints__special_challenges__icon,
                            tspc.starpoints as checkpoints__special_challenges__starpoints,
                            tspc.question as checkpoints__special_challenges__question,
                            tspa.id as checkpoints__special_challenges__options__id,
                            tspa.answer as checkpoints__special_challenges__options__answer
                            from table_race r
                            Left join table_race_type rt on r.race_type = rt.id
                            left join table_race_media trm on trm.race_id = r.id
                            Left join table_race_checkpoints trc on trc.race_id = r.id
                            Left join table_photo_challenge photo on photo.checkpoint_id = trc.id
                            Left join table_physical_challenge tpc on tpc.checkpoint_id = trc.id
                            Left join table_quiz_challenge tqc on tqc.checkpoint_id = trc.id
                            Left join table_special_challenge tspc on tspc.checkpoint_id = trc.id
                            Left join table_challenge_type tct on tct.id = trc.challenge_type
                            Left join table_checkpoint_category tcc on tcc.id = trc.category_id
                            Left join table_physical_challenge_locations tpcl on tpcl.physical_challenge_id = tpc.id
                            Left join table_quiz_answers tqa on tqa.quiz_id = tqc.id
                            Left join table_special_answers tspa on tspa.special_id = tspc.id
                            where r.id =`;
QueryConstants.userTeamStarpoints = `select
                            trt.name as team_name,
                            sum(if(isnull(turs.updated_starpoints), turs.starpoints, turs.updated_starpoints)) as team_starpoints
                            from table_user_race_stats turs
                            join table_race_participants trp ON turs.user_id = trp.user_id AND turs.race_id=trp.race_id
                            join table_race_teams trt ON trt.id=trp.team_id
                            where turs.race_id =`;
QueryConstants.achievedStarpoints = `select starpoints from table_user_race_challenge_history where user_stats_id =`;
QueryConstants.userTeamId = `select team_id from table_race_participants where team_id is not null and user_id =`;
QueryConstants.teamStarpoints = `
                            select tt.race_id, sum(tt.starpoints) as starpoints from
                            (
                                SELECT trt.race_id,
                                   (if(isnull(turs.updated_starpoints), max(turs.starpoints), max(turs.updated_starpoints))) AS starpoints
                                FROM table_user_race_stats turs
                                JOIN table_race_participants trp ON turs.user_id = trp.user_id
                                AND turs.race_id=trp.race_id
                                JOIN table_race_teams trt ON trp.team_id =trt.id
                                WHERE trp.team_id IN`;
QueryConstants.teamId = `select ts.team_id, ts.user_stats_id, ts.status from (select u.id as user_id,
                            if(isnull(turs.updated_starpoints), max(turs.starpoints), turs.updated_starpoints) as starpoints,
                            trp.team_id, trt.name,
                            turs.id as user_stats_id,
                            turs.status as status
                            from table_user u
                            left join table_user_race_stats turs on turs.user_id = u.id
                            join table_race_participants trp ON turs.user_id = trp.user_id AND turs.race_id=trp.race_id
                            join table_race_teams trt ON trt.id=trp.team_id
                            where turs.race_id =`;
QueryConstants.userStatsId = `select
                            t.id
                            from table_user_race_stats t
                            Left join table_bookings tb on tb.race_id = t.race_id and tb.booked_by = t.user_id
                            where t.starpoints = 0 and t.status != 1 and t.race_id =`;
QueryConstants.teamBookingDetails = `select
                            b.id as id,
                            r.id as race_id,
                            r.name as race_name,
                            r.team_score_type as team_score_type,
                            r.allow_end_race as allow_end_race,
                            r.max_race_participants as max_race_participants,
                            r.min_race_participants as min_race_participants,
                            r.max_team_member as max_team_member,
                            r.min_team_member as min_team_member,
                            tbt.name as booking_type,
                            te.start_date as race_start_date,
                            u.name as users__name,
                            u.email as users__email,
                            u.mobile as users__mobile,
                            b.booking_number as booking_number,
                            b.member_count as member_count,
                            tbt.name as participant_type,
                            trt.id as team_id,
                            trt.name as team_name,
                            trt.icon as team_icon
                            from table_bookings b
                            left join table_race r on r.id = b.race_id
                            left join table_user u on u.id = b.booked_by
                            left join table_race_events te on te.id = b.race_event_id
                            left join table_booking_type tbt on tbt.id = b.type
                            left join table_race_teams trt on trt.user_id = b.booked_by and trt.race_id = b.race_id
                            where b.id =`;
QueryConstants.getRaceInvitationCodeList = `select
                            ic.id as invitation_id,
                            ic.first_part as first_part, ic.second_part as second_part,
                            u.id as user_id, u.name as user_name, u.email as user_email
                            from table_race_invitation_code ric
                            Left join table_user u on ric.user_id = u.id
                            Left join table_race r on ric.race_id = r.id
                            left join table_invitation_code ic on ic.id = ric.invitation_code_id
                            where r.id =`;
QueryConstants.getRaceParticipants = `select
                            u.*, b.activate as activate, bt.name as booking_type, te.start_date as event_start_date, te.end_date as event_end_date, te.id as event_id
                            from table_race_participants rp
                            Left join table_race r on rp.race_id = r.id
                            Left join table_user u on rp.user_id = u.id
                            join table_bookings b on rp.booking_id = b.id
                            Left join table_booking_type bt on b.type = bt.id
                            Left join table_race_events te on te.id = rp.event_id
                            Left join table_race_type rt on r.race_type = rt.id
                            where isnull(rp.deleted_at) and r.id =`;
QueryConstants.getMaxAvailableStarPoints = `
                            SELECT sum(rc.starpoints) as max_available_starpoints 
                            FROM (SELECT rc.id, CASE 
                                WHEN tpc.starpoints IS NOT NULL THEN
                                tpc.starpoints 
                                WHEN tqc.starpoints IS NOT NULL THEN
                                tqc.starpoints
                                WHEN tspc.starpoints IS NOT NULL THEN
                                tspc.starpoints
                                WHEN tptc.starpoints IS NOT NULL THEN
                                tptc.starpoints
                                ELSE
                                rc.starpoints
                                END as starpoints
                                FROM table_race_checkpoints rc
                                LEFT JOIN table_physical_challenge tpc on tpc.checkpoint_id = rc.id
                                LEFT JOIN table_quiz_challenge tqc on tqc.checkpoint_id = rc.id
                                LEFT JOIN table_special_challenge tspc on tspc.checkpoint_id = rc.id
                                LEFT JOIN table_photo_challenge tptc on tptc.checkpoint_id = rc.id
                                WHERE rc.race_id = $raceId
                            ) rc`;
QueryConstants.usersRaceLeaderboardStatistical = `
                            select
                                rh.race_id,
                                rh.user_id,
                                max(rh.starpoints) as starpoints,
                                max(rh.user_stats_id) as user_stats_id,
                                max(rs.image_url) as image_url,
                                ckp.name as checkpoint_name,
                                ckp.image as checkpoint_image
                                from (
                                    select distinct
                                        trace_id,
                                        user_id,
                                        user_stats_id,
                                        CASE 
                                            WHEN quiz_challenge_id IS NOT NULL THEN
                                            quiz_challenge_id
                                            WHEN physical_challenge_id IS NOT NULL THEN
                                            physical_challenge_id
                                            WHEN special_challenge_id IS NOT NULL THEN
                                            special_challenge_id
                                            ELSE
                                            ''
                                            END as checkpoint_id,
                                            starpoints as starpoints
                                        from table_user_race_challenge_history
                                ) as rh
                                inner join table_user_race_stats as rs on rs.id = rh.user_stats_id
                                inner join table_race_checkpoints as ckp on ckp.id = rh.checkpoint_id
                                where rh.race_id = 2
                                group by checkpoint_id, rh.user_id, rh.race_id, ckp.name, ckp.image
                                order by checkpoint_id`;
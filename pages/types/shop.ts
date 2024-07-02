export interface Response {
    success:  boolean;
    response: Shop;
}

export interface Shop {
    id:                        number;
    name:                      string;
    domain:                    string;
    last_domain:               string;
    description:               string;
    user_id:                   number;
    is_active:                 number;
    is_premium:                number;
    hide_copyright:            number;
    is_verified:               number;
    vk_link:                   string;
    youtube_link:              null;
    discord_link:              null;
    twitch_link:               null;
    instagram_link:            null;
    tiktok_link:               null;
    theme_id:                  number;
    background:                string;
    logo:                      string;
    favicon:                   string;
    css:                       null;
    enable_background_overlay: number;
    hide_side_image:           number;
    hide_general_online:       number;
    products_image_padding:    number;
    hide_servers:              number;
    test_mode:                 number;
    created_at:                Date;
    updated_at:                Date;
    side:                      string;
    key:                       string;
    color:                     string;
    require_email:             number;
    pay_comission:             number;
    particles:                 string;
    sort_index:                null;
}

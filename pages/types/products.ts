export interface Product {
    id: number
    name: string
    price: number
    old_price: any
    type: string
    number: number
    commands: string[]
    withdraw_commands: any
    withdraw_commands_days: any
    additional_fields: any
    description: any
    image: string
    first_delete: number
    shop_id: number
    created_at: string
    updated_at: string
    sort_index: number
    servers: Server[]
}

interface Server {
    id: number
    name: string
    ip: string
    port: string
    version: string
    is_port_hidden: number
    hide_ip: number
    is_hidden: number
    shop_id: number
    created_at: string
    updated_at: string
}

export interface Ticket {
    id : string,
    invoice_number : string,
    qr_code_url: string;
    qr_code_digits: string;
    date_created : string;
    date_modified : string;
    state : string;
    client : string,
    game : string;
    user_register : string;
    user_modifier : string;
  }

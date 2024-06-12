package com.bog.book.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {
    // TODO: change activate_account.html template and make it better
    ACTIVATE_ACCOUNT("activate_account");

    private final String name;

    EmailTemplateName(String name) {
        this.name = name;
    }
}

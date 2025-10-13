package com.example.coverletteragent.service.util;

import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;

import java.io.IOException;
import java.util.List;

public class TextPositionFinder extends PDFTextStripper {

    private final String searchTerm;
    private float x;
    private float y;

    public TextPositionFinder(String searchTerm) throws IOException {
        this.searchTerm = searchTerm;
    }

    @Override
    protected void writeString(String text, List<TextPosition> textPositions) throws IOException {
        if (text.contains(searchTerm)) {
            // Find the exact position of the first character of the search term
            this.x = textPositions.get(0).getXDirAdj();
            this.y = textPositions.get(0).getYDirAdj();
        }
        super.writeString(text, textPositions);
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }
}
